// TODO: Refactor this into its own package
import WebSocket from 'ws'
import BaseMill from '../BaseMill'

class CoinbaseMill extends BaseMill {
  private ws: WebSocket
  private readonly pairs: string[]

  constructor({
    id = 'coinbase',
    socketServerUrl = 'wss://ws-feed.exchange.coinbase.com',
    // @ts-ignore
    pairs = ['BTC-USDT'],
  }) {
    super()

    if (id) this.setId(id)
    this.pairs = pairs

    this.ws = new WebSocket(socketServerUrl)
  }

  start = () => {
    super.start()

    this.ws.on('open', () => {
      const openMessage = {
        type: 'subscribe',
        channels: [
          {
            name: 'ticker',
            product_ids: this.pairs,
          },
        ],
      }

      this.ws.send(JSON.stringify(openMessage))
    })

    // TODO: Lets setup some types here for coinbase payloads
    this.ws.on('message', data => {
      const d = JSON.parse(data.toString())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (d.type !== 'ticker') return

      const paper = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        data: { ...d, price: Number(d.price) },
        created: new Date(),
      }

      this.emitter.publish(`mill.${this.id ?? 'undefined'}`, paper)
    })
  }
}

export default CoinbaseMill
