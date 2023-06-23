import Workshop from './Workshop'
import { IPubSub, PubSub } from './services/PubSub'
import BaseMill from './BaseMill'
import BaseMuseum from './BaseMuseum'

// TODO: Configure app level ability to report on curator process's to foundation or custom (prometheus?)
// TODO: Collab consensus

class Curator {
  workshops: Workshop[] = []
  mills: BaseMill[] = []
  museums: BaseMuseum[] = []
  daemon: NodeJS.Timer | null
  emitter: IPubSub

  constructor() {
    this.daemon = null
    // @ts-ignore
    this.emitter = new PubSub()
  }

  //addWorkshop = (workshop: Workshop): this => {
  //  this.workshops.push(workshop)
  //
  //  return this
  //}

  addMill = (MillClass: typeof BaseMill, options?: object): this => {
    const mill = new MillClass({ ...(options ?? {}) })
    mill.setEmitter(this.emitter)

    this.mills.push(mill)

    return this
  }

  addMuseum = (MuseumClass: typeof BaseMuseum, options?: object): this => {
    const museum = new MuseumClass({ ...(options ?? {}) })
    museum.setEmitter(this.emitter)

    this.museums.push(museum)

    return this
  }

  start = async (): Promise<this> => {
    await Promise.all(
      [...this.mills, ...this.workshops, ...this.museums].map(item =>
        item.start()
      )
    )

    this.emitter.publish('curator', 'starting')

    // this will keep daemon alive forever
    this.daemon = setInterval(() => {
      // TODO: do something
    }, 1 << 30)

    console.info(
      '折 お り 紙 がみ (origami), from 折 お り (ori, “to fold”) + 紙 かみ (kami, “paper“)'
    )
    return this
  }

  stop() {
    // await Promise.all(this.workshops.map(workshop => workshop.stop))
    this.emitter.publish('curator', 'stopping')

    // TODO: does not trigger
    // Process finished with exit code 130 (interrupted by signal 2: SIGINT)
    if (this.daemon) clearInterval(this.daemon)

    return this
  }
}

export default Curator
