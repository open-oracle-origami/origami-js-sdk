import { DateTime } from 'luxon'
import { Paper, SubscriptionListener, SyncOrAsyncFn } from '../types'

export interface IPubSub {
  publish: (topic: string, data: string | object) => void
  subscribe: (topic: string, callback: SubscriptionListener<any>) => void
  unsubscribe: (topic: string) => void
}

export interface IRun {
  id: string
  emitter: IPubSub
  running: boolean
  start: SyncOrAsyncFn<this>
  stop: SyncOrAsyncFn<this>
  init?: SyncOrAsyncFn<SyncOrAsyncFn<void>>
  end?: SyncOrAsyncFn<void>
}

export interface IMill extends IRun {
  press: (sku: string, data: any, timestamp: DateTime) => this
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
