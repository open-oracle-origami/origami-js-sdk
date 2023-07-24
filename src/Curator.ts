import assert from 'node:assert'

import Run from './Run'
import { Resource, IResource, CuratorConfig, SyncOrAsyncFn } from './types'
import { IMill, IMuseum, IWorkshop } from './interfaces'

class Curator extends Run {
  mills: IMill[] = []
  museums: IMuseum[] = []
  workshops: IWorkshop[] = []
  autoAssign: boolean = true

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
    const { mills, museums, workshops, autoAssign = true } = config
    this.init ??= this.defaultInit
    this.autoAssign = autoAssign

    if (mills) this.mills = mills
    if (museums) this.museums = museums
    if (workshops) this.workshops = workshops
  }

  plan(C: Resource | IResource, ...rest: any[]): this
  plan(C: new (...args: any[]) => Resource, ...rest: any[]): this
  plan(C: (...args: any[]) => Resource | IResource, ...rest: any[]): this
  plan(
    C:
      | Resource
      | IResource
      | (new (...args: any[]) => Resource)
      | ((...args: any[]) => Resource | IResource),
    ...rest: any[]
  ): this {
    assert(!this.running, `${this.id} already started.`)

    let c: IResource

    if ('id' in C) {
      c = C as IResource
      c.assign(this)
    } else {
      const config = rest[0] ?? {}
      const nextConfig = { emitter: this.emitter, ...config }

      try {
        // @ts-ignore
        c = new C(nextConfig)
      } catch {
        // @ts-ignore
        c = C(nextConfig)
      }
    }

    if (c.id.includes('mill')) {
      c = c as IMill
      this.mills.push(c)
      if (this.autoAssign) this.workshops.forEach(w => w.mills.push(c.id))
    } else if (c.id.includes('museum')) {
      c = c as IMuseum
      this.museums.push(c)
      if (this.autoAssign) c.workshops = this.workshops.map(w => w.id)
    } else if (c.id.includes('workshop')) {
      c = c as IWorkshop
      this.workshops.push(c)
      if (this.autoAssign) {
        c.mills = this.mills.map(m => m.id)
        this.museums.forEach(m => m.workshops.push(c.id))
      }
    } else {
      throw new Error(`${c.id} is not a Mill, Museum, or Workshop`)
    }

    return this
  }
}

export default Curator
