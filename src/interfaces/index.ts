import {
  Paper,
  SubscriptionListener,
  SyncOrAsyncFn,
  InitFn,
  CallbackFn,
  RunConfig,
  Origami,
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
  start: (listener?: SubscriptionListener<any>) => this | Promise<this>
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
  certify?: (origami: Origami, museum: IMuseum) => boolean | Promise<boolean>
  curate?: (origami: Origami, museum: IMuseum) => void | Promise<void>
}

export interface IWorkshop extends IRun {
  mills: string[]
  backlog: number
  stack: Paper[]
  fold: (collection: string, assembly: Paper[], data: any) => this
  assemble?: (paper: Paper, workshop: IWorkshop) => void
  crease?: (paper: Paper) => Paper
}
