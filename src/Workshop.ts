// TODO: Refactor this whole thing
import { EventEmitter } from 'node:events'

class Workshop extends EventEmitter {
  assembly: undefined | (() => void)
  // mills: IMill[] = []

  // constructor(mills: IMill[], assembly: undefined | (() => void)) {
  //   super()
  //   this.mills = mills
  //   this.assembly = assembly
  // }

  // mill = (mill: IMill): this => {
  //   this.mills.push(mill)
  //   return this
  // }

  start() {
    // await Promise.all(this.mills.map(mill => mill.start))
    this.emit('start', null, this)
    return this
  }

  stop() {
    // await Promise.all(this.mills.map(mill => mill.stop))
    this.emit('stop', null, this)
    return this
  }
}

export default Workshop
