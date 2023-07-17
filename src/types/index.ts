import { DateTime } from 'luxon'

import { IMill, IMuseum, IWorkshop, IPubSub } from '../interfaces'

export type SyncOrAsyncFn<ReturnType> =
  | (() => Promise<ReturnType>)
  | (() => ReturnType)
export type SubscriptionListener<T> = (topic: string, data?: T) => void

export type RunConfig = {
  id: string
  emitter?: IPubSub
  init?: SyncOrAsyncFn<SyncOrAsyncFn<void>>
}

export type CuratorConfig = RunConfig & {
  mills?: IMill[]
  museums?: IMuseum[]
  workshops?: IWorkshop[]
}

export type MillConfig = RunConfig & {
  placeholder?: string
}

export type MuseumConfig = RunConfig & {
  workshops: string[]
}

export type WorkshopConfig = RunConfig & {
  mills: string[]
  assembly?: (mill: string, paper: Paper) => void
  crease?: (paper: Paper) => Paper
  backlog?: number
}

export type IResource = IMill | IMuseum | IWorkshop

export type Paper = {
  mill: string
  data: any
  timestamp: DateTime
}

export type Origami = {
  collection: string
  data: any
  timestamp: DateTime
}
