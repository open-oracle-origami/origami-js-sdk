import {
  Paper,
  SubscriptionListener,
  SyncOrAsyncFn,
  InitFn,
  CallbackFn,
  RunStartFn,
  RunConfig,
} from '../types'

export interface IPubSub {
  publish: (topic: string, data: string | object) => void
  subscribe: (topic: string, callback: SubscriptionListener<any>) => void
  unsubscribe: (topic: string) => void
}

export interface IRun {
  readonly id: string
  readonly emitter: IPubSub
  running: boolean
  start: RunStartFn
  stop: SyncOrAsyncFn<this>
  assign: (object: RunConfig) => this
  init?: InitFn
  end?: CallbackFn<void>
  listener?: SubscriptionListener<any>
}

export interface IMill extends IRun {
  press: (sku: string, data: any, timestamp?: number) => this
}

export interface IMuseum extends IRun {
  workshops: string[]
}

export interface IWorkshop extends IRun {
  mills: string[]
  backlog: number
  stack: Paper[]
  fold: (collection: string, assembly: Paper[], data: any) => this
  assemble?: (mill: string, paper: Paper) => void
  crease?: (paper: Paper) => Paper
}
