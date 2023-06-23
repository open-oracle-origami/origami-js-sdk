import PubSubJs from 'pubsub-js'

type SubscriptionListener<T> = (topic: string, data?: T) => void

export interface IPubSub {
  publish: (topic: string, data: string | object) => void
  subscribe: (topic: string, callback: SubscriptionListener<any>) => void
  unsubscribe: (topic: string) => void
}

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

export class PubSub {
  adapter: IPubSub

  constructor() {
    this.adapter = new MemoryAdapter()
  }

  // TODO: Lets allow for switchable adapters and make it more typesafe
  // setAdapter = (adapter: IPubSub) => {
  //   this.adapter = adapter
  // }

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
