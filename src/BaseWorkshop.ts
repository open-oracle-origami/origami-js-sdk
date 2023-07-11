import { IPubSub, PubSub } from './services/PubSub'

class BaseWorkshop {
  emitter: IPubSub = new PubSub()
  running = false
  mills: string[] = []
  id?: string

  constructor({ mills = [], id = '' } = {}) {
    if (id) this.setId(id)
    this.mills = mills
  }

  setEmitter(emitter: any) {
    this.emitter = emitter
  }

  setId(id: string) {
    this.id = id
    if (!this.id?.startsWith('workshop.')) {
      this.id = `workshop.${this.id}`
    }
  }

  start() {
    this.running = true
  }

  stop() {
    this.running = false
  }
}

export default BaseWorkshop
