import { IRun, IMill, IMuseum, IWorkshop, IPubSub } from '../interfaces'

export type SubscriptionListener<T> = (topic: string, data?: T) => void

export type SyncOrAsyncFn<ReturnType> =
  | (() => Promise<ReturnType>)
  | (() => ReturnType)

export type InitCallbackFn<ReturnType> =
  | ((i: IRun) => Promise<ReturnType>)
  | ((i: IRun) => ReturnType)

export type RunStartFn =
  | ((listener?: SubscriptionListener<any>) => Promise<void>)
  | ((listener?: SubscriptionListener<any>) => void)

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
  assemble?: (mill: string, paper: Paper) => void
  crease?: (paper: Paper) => Paper
  backlog?: number
}

export type IResource = IMill | IMuseum | IWorkshop

export type Paper = {
  mill: string
  sku: string
  data: any
  timestamp: number
}

export type Origami = {
  workshop: string
  collection: string
  assembly: Paper[]
  data: any
  timestamp: number
}
