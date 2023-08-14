import { Mill, Museum, Workshop } from '../'
import { IMill, IMuseum, IWorkshop, IPubSub } from '../interfaces'

export type Resource = Mill | Museum | Workshop
export type IResource = IMill | IMuseum | IWorkshop
export type SubscriptionListener<T> = (topic: string, data?: T) => void

export type SyncOrAsyncFn<ReturnType> = () => ReturnType | Promise<ReturnType>

export type CallbackFn<ReturnType> = (
  ...args: any[]
) => ReturnType | Promise<ReturnType>

export type InitFn = CallbackFn<CallbackFn<void>>

export type RunConfig = {
  id: string
  emitter?: IPubSub
  init?: InitFn
  config?: object
}

export type CuratorConfig = RunConfig & {
  mills?: IMill[]
  museums?: IMuseum[]
  workshops?: IWorkshop[]
  autoAssign?: boolean
}

export type MillConfig = RunConfig

export type MuseumConfig = RunConfig & {
  workshops: string[]
  certify?: (origami: Origami, museum: IMuseum) => boolean | Promise<boolean>
  curate?: (origami: Origami, museum: IMuseum) => void | Promise<void>
}

export type WorkshopConfig = RunConfig & {
  mills?: string[]
  assemble?: (paper: Paper, workshop: IWorkshop) => void
  crease?: (paper: Paper) => Paper
  backlog?: number
}

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
