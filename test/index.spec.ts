import Curator from '../src/Curator'

describe('curator', () => {
  it('Basic test', () => {
    const result = new Curator()

    expect(result).toBeInstanceOf(Curator)
  })
})
