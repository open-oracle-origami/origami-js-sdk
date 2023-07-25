import PubSubJs from 'pubsub-js'

import { IPubSub } from '../interfaces'
import { SubscriptionListener } from '../types'

export class MemoryAdapter implements IPubSub {
  publish = (topic: string, data: string | object) => {
    PubSubJs.publish(topic, data)
  }

  subscribe = (topic: string, callback: SubscriptionListener<any>) => {
    PubSubJs.subscribe(topic, callback)
  }

  unsubscribe = (topic: string) => {
    PubSubJs.unsubscribe(topic)
  }
}

export class PubSub implements IPubSub {
  adapter: IPubSub

  constructor(
    { adapter }: { adapter: IPubSub } = { adapter: new MemoryAdapter() }
  ) {
    this.adapter = adapter
  }

  publish = (topic: string, data: string | object) => {
    this.adapter.publish(topic, data)
  }

  subscribe = (topic: string, callback: SubscriptionListener<any>) => {
    this.adapter.subscribe(topic, callback)
  }

  unsubscribe = (topic: string) => {
    this.adapter.unsubscribe(topic)
  }
}

export default PubSub
