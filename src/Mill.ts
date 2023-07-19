import Run from './Run'
import { Paper, MillConfig } from './types'
import { IMill } from './interfaces'

class Mill extends Run implements IMill {
  constructor(config: MillConfig) {
    super(config)
    const { id } = config
    this.id = `mill.${id.replace('mill.', '')}`
  }

  press = (sku: string, data: any, timestamp: number = Date.now()): this => {
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
