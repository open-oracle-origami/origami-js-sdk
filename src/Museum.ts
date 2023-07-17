import Run from './Run'
import { IMuseum } from './interfaces'
import { MuseumConfig } from './types'

class Museum extends Run implements IMuseum {
  workshops: string[]

  constructor(config: MuseumConfig) {
    super(config)
    const { id, workshops } = config
    this.id = `museum.${id.replace('museum.', '')}`
    this.workshops = workshops
  }
}

export default Museum
