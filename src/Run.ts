import { PubSub } from './services/PubSub'
import { IPubSub, IRun } from './interfaces'
import { RunConfig, InitFn, CallbackFn, SubscriptionListener } from './types'

class Run implements IRun {
  readonly id: string
  emitter: IPubSub
  running = false
  init?: InitFn
  end?: CallbackFn<void>
  listener?: SubscriptionListener<any>
  config?: object

  static create(config: RunConfig): IRun {
    return new this(config) as IRun
  }

  constructor({ id, emitter = new PubSub(), init, config = {} }: RunConfig) {
    this.id = id
    this.emitter = emitter
    this.init = init
    this.config = config
  }

  start = async (listener?: SubscriptionListener<any>): Promise<this> => {
    if (this.running) return this

    this.running = true

    if (listener) {
      this.listener = listener
      this.emitter.subscribe(this.id, this.listener)
    }

    if (this.init) this.end = await this.init(this)

    return this
  }

  stop = async (): Promise<this> => {
    if (!this.running) return this

    this.running = false
    if (this.listener) this.emitter.unsubscribe(this.id)
    if (this.end) await this.end(this)

    return this
  }

  assign = ({ emitter }: RunConfig): this => {
    if (emitter) this.emitter = emitter

    return this
  }
}

export default Run
