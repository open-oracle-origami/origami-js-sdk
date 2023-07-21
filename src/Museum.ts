import Run from './Run'
import { IMuseum } from './interfaces'
import { MuseumConfig } from './types'

class Museum extends Run implements IMuseum {
  workshops: string[]

  static create(config: MuseumConfig): IMuseum {
    return new this(config) as IMuseum
  }

  constructor(config: MuseumConfig) {
    super({ ...config, id: `museum.${config.id.replace('museum.', '')}` })
    const { workshops } = config
    this.workshops = workshops
  }
}

export default Museum
