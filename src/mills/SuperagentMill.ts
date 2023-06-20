import { EventEmitter } from 'node:events'

// @ts-ignore
import agent from 'superagent'
// @ts-ignore
import { request as SuperAgent } from '@types/superagent'

import { IMill } from '../interfaces'
import { Paper } from '../types'

type AgentOrUrl = string | SuperAgent
type SuperagentMillConfig = {
  name: string
  parser: (data: any) => object
  backlog?: number
  rate?: number
  killSwitch?: number
  auto?: boolean
}

class SuperagentMill extends EventEmitter implements IMill {
  name: string
  failures: number
  agent: () => SuperAgent
  running = false
  paper: Paper[] = []
  backlog = 10
  rate = 30000
  killSwitch = 3
  // @ts-ignore
  interval: NodeJS.Timer
  parser: (data: any) => object
  constructor(
    agentOrUrl: AgentOrUrl,
    {
      name,
      backlog = 10,
      rate = 30000,
      parser = data => data as object,
      killSwitch = 3,
      auto = true,
    }: SuperagentMillConfig
  ) {
    super()
    this.name = name
    this.backlog = backlog
    this.rate = rate
    this.failures = 0
    this.killSwitch = killSwitch
    this.parser = parser
    if (typeof agentOrUrl === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      this.agent = () => agent.get(agentOrUrl).type('json').retry(3)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      this.agent = () => agentOrUrl
    }

    if (auto) void this.start()
  }

  press = async (): Promise<Paper | undefined> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const res = await this.agent()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      const data = this.parser(res.body)
      const paper: Paper = {
        data,
        mill: this,
        // @ts-ignore
        created: Date.UTC(),
      }
      this.failures = 0
      this.paper.unshift(paper)
      if (this.paper.length >= this.backlog) this.paper.pop()
      this.emit('press', null, paper, this)
      return paper
    } catch (e) {
      this.emit('press', e)
      this.failures++
      if (this.failures >= this.killSwitch) await this.stop()
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  start = async (): Promise<this> => {
    if (!this.running) {
      void this.press()
      this.interval = setInterval(() => {
        void this.press()
      }, this.rate)
      this.running = true
      this.emit('start', null, this)
    }
    return this
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  stop = async (): Promise<this> => {
    clearInterval(this.interval)
    this.emit('stop', null, this)
    return this
  }
}

export default SuperagentMill
