import Run from './Run'
import { Resource, IResource, CuratorConfig, SyncOrAsyncFn } from './types'
import { IMill, IMuseum, IWorkshop } from './interfaces'

class Curator extends Run {
  mills: IMill[] = []
  museums: IMuseum[] = []
  workshops: IWorkshop[] = []

  static create(config: CuratorConfig): Curator {
    return new this(config)
  }

  defaultInit = async (): Promise<SyncOrAsyncFn<void>> => {
    const daemon = setInterval(() => {}, 1 << 30)

    await Promise.all(
      [...this.mills, ...this.workshops, ...this.museums].map(item =>
        item.start()
      )
    )

    this.emitter.publish(this.id, 'start')

    console.info(
      '折 お り 紙 がみ (origami), from 折 お り (ori, “to fold”) + 紙 かみ (kami, “paper“)'
    )

    return async (): Promise<void> => {
      this.emitter.publish(this.id, 'stop')

      await Promise.all(
        [...this.mills, ...this.workshops, ...this.museums].map(item =>
          item.stop()
        )
      )

      clearInterval(daemon)
    }
  }

  constructor(config: CuratorConfig) {
    super({ ...config, id: `curator.${config.id.replace('curator.', '')}` })
    const { mills, museums, workshops } = config
    this.init ??= this.defaultInit

    if (mills) this.mills = mills
    if (museums) this.museums = museums
    if (workshops) this.workshops = workshops
  }

  plan(C: IResource, config?: object): this
  plan(C: new (config: object) => Resource, config: object): this
  plan(
    C: IResource | (new (config: object) => Resource),
    config: object | undefined
  ): this {
    const c =
      typeof C === 'function' ? new C({ emitter: this.emitter, ...config }) : C

    if (this.running && !c.running) void c.start()

    if (c.id.includes('mill')) {
      this.mills.push(c as IMill)
    } else if (c.id.includes('museum')) {
      this.museums.push(c as IMuseum)
    } else if (c.id.includes('workshop')) {
      this.workshops.push(c as IWorkshop)
    } else {
      throw new Error(`${c.id} is not a Mill, Museum, or Workshop`)
    }

    return this
  }
}

export default Curator
