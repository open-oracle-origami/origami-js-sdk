import Run from './Run'
import { Paper, Origami, WorkshopConfig, SyncOrAsyncFn } from './types'
import { IWorkshop } from './interfaces'
import { now } from './utils'

class Workshop extends Run implements IWorkshop {
  mills: string[]
  backlog: number = 10000
  stack: Paper[] = []
  assemble?: (mill: string, paper: Paper) => void
  crease?: (paper: Paper) => Paper

  static create(config: WorkshopConfig): IWorkshop {
    return new this(config) as IWorkshop
  }

  defaultInit = (): SyncOrAsyncFn<void> => {
    this.mills.forEach(mill => {
      this.emitter.subscribe(mill, (topic, paper: Paper) => {
        const creased = this.crease ? this.crease(paper) : paper
        const length = this.stack.unshift(creased)
        if (length > this.backlog) this.stack.pop()
        if (this.assemble) this.assemble(topic, creased)
      })
    })

    return (): void => {
      this.mills.forEach(mill => this.emitter.unsubscribe(mill))
    }
  }

  constructor(config: WorkshopConfig) {
    super({ ...config, id: `workshop.${config.id.replace('workshop.', '')}` })
    const { mills, assemble, crease, backlog } = config
    this.init ??= this.defaultInit

    this.mills = mills
    if (assemble) this.assemble = assemble
    if (crease) this.crease = crease
    if (backlog) this.backlog = backlog
  }

  fold = (collection: string, assembly: Paper[], data: any): this => {
    const origami: Origami = {
      workshop: this.id,
      collection,
      assembly,
      data,
      timestamp: now(),
    }

    this.emitter.publish(this.id, origami)

    return this
  }
}

export default Workshop
