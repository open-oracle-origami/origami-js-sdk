import { EventEmitter } from 'node:events'

import Workshop from './Workshop'

// TODO: Configure app level ability to report on curator process's to foundation or custom (prometheus?)
// TODO: Collab consensus

class Curator extends EventEmitter {
  curate: () => Promise<this>
  workshops: Workshop[] = []
  constructor(workshops: Workshop[]) {
    super()
    this.workshops = workshops
    this.curate = this.start
  }

  workshop = (workshop: Workshop): this => {
    this.workshops.push(workshop)
    return this
  }

  start = async (): Promise<this> => {
    await Promise.all(this.workshops.map(workshop => workshop.start))
    this.emit('start', null, this)
    console.info(
      '折 お り 紙 がみ (origami), from 折 お り (ori, “to fold”) + 紙 かみ (kami, “paper“)'
    )
    return this
  }

  stop = async (): Promise<this> => {
    await Promise.all(this.workshops.map(workshop => workshop.stop))
    this.emit('stop', null, this)
    return this
  }
}

export default Curator
