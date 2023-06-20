import { EventEmitter } from 'node:events'

interface IMuseum extends EventEmitter {
  name: string
}

export default IMuseum
