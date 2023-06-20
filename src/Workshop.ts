import { EventEmitter } from 'node:events'

import { IMill, IMuseum } from './interfaces'
class Workshop extends EventEmitter {
  assembly: undefined | (() => void)
  mills: IMill[] = []
  museums: IMuseum[] = []

  constructor(mills: IMill[], assembly: undefined | (() => void)) {
    super()
    this.mills = mills
    this.assembly = assembly
  }

  mill = (mill: IMill): this => {
    this.mills.push(mill)
    return this
  }

  museum = (museum: IMuseum): this => {
    this.museums.push(museum)
    return this
  }

  start = async (): Promise<this> => {
    await Promise.all(this.mills.map(mill => mill.start))
    this.emit('start', null, this)
    return this
  }

  stop = async (): Promise<this> => {
    await Promise.all(this.mills.map(mill => mill.stop))
    this.emit('stop', null, this)
    return this
  }
}

export default Workshop
