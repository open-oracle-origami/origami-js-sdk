import { EventEmitter } from 'node:events'

import { IMuseum } from '../interfaces'

class EthersMuseum extends EventEmitter implements IMuseum {
  name: string

  constructor(name: string) {
    super()
    this.name = name
  }
}

export default EthersMuseum
