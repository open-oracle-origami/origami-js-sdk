/*
// Old Deprecated...

import { EventEmitter } from 'node:events'
import assert from 'node:assert/strict'

class Origami extends EventEmitter {
  constructor(config = { key, type, threshold, deviation }) {
    super()
    this.config = { type: 'aggregator', ...config }
    this.data = []
    this.sources = []
    this.destinations = []
    this.standing = false

    assert(this.config.type === 'aggregator', 'Aggregator is the only oracle type supported currently.')
    assert(this.config.key, 'Must define a key.')

    // Aliases
    this.source = this.src
    this.destination = this.dst
    this.exec = this.fold
  }

  threshold(ms) {
    assert(ms >= 1, 'Must be at least 1 ms threshold.')
    this.config.threshold = ms

    return this
  }

  deviation(percentage) {
    assert(percentage >= 1, 'Must be at least .1%.')
    this.config.deviation = percentage

    return this
  }

  paper(source) {
    this.sources.push(source)

    return this
  }

  fold(destination) {
    this.destinations.push(destination)

    return this
  }

  update() {
    if (this.sources.every(source => !!source.data)) {
      this.sources.forEach()
    } else {
      console.info('Waiting on all data sources to update.')
    }
  }

  stand() {
    if (!this.standing) {
      this.sources.forEach(source => {
        source.on('update', this.update)

        source.exec()
      })
      this.standing = true

      console.info('折 お り 紙 がみ (origami), from 折 お り (ori, “to fold”) + 紙 かみ (kami, “paper)')
    }
  }
}

export default Origami
 */

/**
 function hasDeviated(lastPrice, nextPrice, percentage) {
  const deviation = Math.abs((nextPrice - lastPrice) / lastPrice) * 100;
  return deviation > percentage;
}
 **/
