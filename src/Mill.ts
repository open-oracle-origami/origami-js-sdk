import { DateTime } from 'luxon'

import Run from './Run'
import { Paper, MillConfig } from './types'
import { IMill } from './interfaces'

class Mill extends Run implements IMill {
  constructor(config: MillConfig) {
    super(config)
    const { id } = config
    this.id = `mill.${id.replace('mill.', '')}`
  }

  press = (data: any): this => {
    const paper: Paper = {
      mill: this.id,
      data,
      timestamp: DateTime.utc(),
    }

    this.emitter.publish(this.id, paper)

    return this
  }
}

export default Mill
