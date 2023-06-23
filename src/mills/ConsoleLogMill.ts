import BaseMill from '../BaseMill'

class ConsoleLogMill extends BaseMill {
  parser: (data: any) => object
  running = false

  // @ts-ignore
  constructor({ id, parser = data => data as object }) {
    super()

    this.id = id
    this.parser = parser
  }

  private run = () => {
    const paper = {
      // @ts-ignore
      data: 'TEST',
      mill: this,
      created: new Date(),
    }

    this.emitter.publish(`mill.${this.id ?? 'undefined'}`, paper)

    return paper
  }

  start = () => {
    setInterval(this.run, 1500)
  }
}

export default ConsoleLogMill
