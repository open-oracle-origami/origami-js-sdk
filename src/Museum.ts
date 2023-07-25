import Run from './Run'
import { IMuseum } from './interfaces'
import { MuseumConfig, Origami, SyncOrAsyncFn } from './types'

class Museum extends Run implements IMuseum {
  workshops: string[]
  certify?: (origami: Origami, museum: IMuseum) => boolean | Promise<boolean>
  curate?: (origami: Origami, museum: IMuseum) => void | Promise<void>

  static create(config: MuseumConfig): IMuseum {
    return new this(config) as IMuseum
  }

  defaultInit = (): SyncOrAsyncFn<void> => {
    this.workshops.forEach(workshop => {
      this.emitter.subscribe(workshop, (topic, origami: Origami) => {
        void (async () => {
          const certified = this.certify
            ? await this.certify(origami, this)
            : true
          if (certified && this.curate) await this.curate(origami, this)
        })()
      })
    })

    return (): void => {
      this.workshops.forEach(workshop => this.emitter.unsubscribe(workshop))
    }
  }

  constructor(config: MuseumConfig) {
    super({ ...config, id: `museum.${config.id.replace('museum.', '')}` })
    const { workshops, certify, curate } = config
    this.workshops = workshops
    this.init ??= this.defaultInit

    if (certify) this.certify = certify
    if (curate) this.curate = curate
  }
}

export default Museum
