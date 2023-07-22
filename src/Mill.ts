import Run from './Run'
import { Paper, MillConfig } from './types'
import { IMill } from './interfaces'
import { now } from './utils'

class Mill extends Run implements IMill {
  static create(config: MillConfig): IMill {
    return new this(config) as IMill
  }

  constructor(config: MillConfig) {
    super({
      ...config,
      id: `mill.${config.id.replace('mill.', '')}`,
    })
  }

  press = (sku: string, data: any, timestamp: number = now()): this => {
    const paper: Paper = {
      mill: this.id,
      sku,
      data,
      timestamp,
    }

    this.emitter.publish(this.id, paper)

    return this
  }
}

export default Mill
