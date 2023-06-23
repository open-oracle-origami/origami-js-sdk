import BaseMuseum from '../BaseMuseum'

/**
 * ConsoleMuseum
 *
 * id: The identifier of the museum
 *
 * sources: These refer to the "channels" or "topics" to listen to... usually a mill ID or a workshop ID
 *
 */
class ConsoleMuseum extends BaseMuseum {
  constructor({ id = 'console', sources = [] } = {}) {
    super({ id, sources })
  }

  start() {
    super.start()

    this.sources.forEach(source => {
      this.emitter.subscribe(source, (topic, data) => {
        console.log({ topic, data: JSON.stringify(data) })
      })
    })
  }
}

export default ConsoleMuseum
