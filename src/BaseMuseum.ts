import { IPubSub, PubSub } from './services/PubSub'

class BaseMuseum {
  emitter: IPubSub = new PubSub()
  running = false
  sources: string[] = []
  id?: string

  constructor({ sources = [], id = '' } = {}) {
    if (id) this.setId(id)
    this.sources = sources
  }

  setEmitter(emitter: any) {
    this.emitter = emitter
  }

  setId(id: string) {
    this.id = id
  }

  start() {
    this.running = true
  }

  stop() {
    this.running = false
  }
}

export default BaseMuseum
