import { IPubSub, PubSub } from './services/PubSub'

class BaseMill {
  emitter: IPubSub = new PubSub()
  running = false
  id?: string | null = null

  constructor({ id = null } = {}) {
    if (id) this.setId(id)
  }

  setEmitter(emitter: any) {
    this.emitter = emitter
  }

  setId(name: string) {
    this.id = name
  }

  start() {
    this.running = true
  }

  stop() {
    this.running = false
  }
}

export default BaseMill
