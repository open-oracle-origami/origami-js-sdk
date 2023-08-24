import http from 'node:http'
import Prometheus from 'prom-client'

import type { IPubSub, IRun } from './interfaces'
import type {
  RunConfig,
  MonitorConfig,
  InitFn,
  CallbackFn,
  SubscriptionListener,
} from './types'

import { PubSub } from './services/PubSub'

class Run implements IRun {
  readonly id: string
  emitter: IPubSub
  monitor: MonitorConfig
  running = false
  init?: InitFn
  end?: CallbackFn<void>
  listener?: SubscriptionListener<any>
  config?: object

  static create(config: RunConfig): IRun {
    return new this(config) as IRun
  }

  constructor({
    id,
    emitter = new PubSub(),
    monitor = {},
    init,
    config = {},
  }: RunConfig) {
    this.id = id
    this.emitter = emitter
    this.monitor = {
      registry: new Prometheus.Registry(),
      port: 9090,
      ...monitor,
    }
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

    void this.startMonitor()

    return this
  }

  stop = async (): Promise<this> => {
    if (!this.running) return this

    this.running = false
    if (this.listener) this.emitter.unsubscribe(this.id)
    if (this.end) await this.end(this)

    this.stopMonitor()

    return this
  }

  assign = ({ emitter, monitor }: RunConfig): this => {
    if (emitter) this.emitter = emitter
    if (monitor) this.monitor = monitor

    return this
  }

  startMonitor = (): this => {
    const registry = this.monitor?.registry
    const server = this.monitor?.server

    if (registry && !server) {
      registry.setDefaultLabels({
        app: this.id,
      })

      Prometheus.collectDefaultMetrics({ register: registry })

      this.monitor.server = http
        .createServer((req, res) => {
          if (req.url === '/metrics') {
            res.setHeader('Content-Type', registry.contentType)
            registry
              .metrics()
              .then(data => res.writeHead(200).end(data))
              .catch(err => console.error(err))
          } else {
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(404)
            res.end(JSON.stringify({ error: 'Resource not found' }))
          }
        })
        .listen(this.monitor.port)
    }

    return this
  }

  stopMonitor = (): this => {
    const server = this.monitor?.server

    if (server) {
      server.close()
      this.monitor.server = undefined
    }

    return this
  }
}

export default Run
