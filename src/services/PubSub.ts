import PubSubJs from 'pubsub-js'

import { IPubSub } from '../interfaces'
import { SubscriptionListener } from '../types'

export class MemoryAdapter implements IPubSub {
  publish = (topic: string, data: any) => {
    return PubSubJs.publish(topic, data)
  }

  subscribe = (topic: string, callback: SubscriptionListener<any>) => {
    return PubSubJs.subscribe(topic, callback)
  }

  unsubscribe = (topic: string) => {
    return PubSubJs.unsubscribe(topic)
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
    return this.adapter.publish(topic, data)
  }

  subscribe = (topic: string, callback: SubscriptionListener<any>) => {
    return this.adapter.subscribe(topic, callback)
  }

  unsubscribe = (topic: string) => {
    return this.adapter.unsubscribe(topic)
  }
}

export default PubSub
