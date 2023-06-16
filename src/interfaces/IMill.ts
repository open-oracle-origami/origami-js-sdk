import { EventEmitter } from 'node:events'

import { Paper } from '../types'

interface IMill extends EventEmitter {
  name: string
  running: boolean
  paper: Paper[]
  backlog: number // Configuration to keep paper backlog short
  rate?: number // Typically used in a poll process
  start: () => Promise<this>
  stop: () => Promise<this>
  press: () => Promise<Paper | undefined>
}

export default IMill
