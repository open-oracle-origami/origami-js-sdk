import { PubSub } from './services/PubSub'
import { IPubSub, IRun } from './interfaces'
import { RunConfig, InitCallbackFn } from './types'

class Run implements IRun {
  id: string
  emitter: IPubSub
  running = false
  init?: InitCallbackFn<InitCallbackFn<void>>
  end?: InitCallbackFn<void>

  constructor({ id, emitter = new PubSub(), init }: RunConfig) {
    this.id = `ns.${id.replace('ns.', '')}`
    this.emitter = emitter
    this.init = init
  }

  start = async (): Promise<this> => {
    if (this.running) return this

    this.running = true
    if (this.init) this.end = await this.init(this)

    return this
  }

  stop = async (): Promise<this> => {
    if (!this.running) return this

    this.running = false
    if (this.end) await this.end(this)

    return this
  }
}

export default Run
