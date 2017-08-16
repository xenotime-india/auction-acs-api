import { AuctionItem } from '.'

let auctionItem

beforeEach(async () => {
  auctionItem = await AuctionItem.create({ url: 'test', owner: 'test', basePrice: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = auctionItem.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(auctionItem.id)
    expect(view.url).toBe(auctionItem.url)
    expect(view.owner).toBe(auctionItem.owner)
    expect(view.basePrice).toBe(auctionItem.basePrice)
    expect(view.status).toBe(auctionItem.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = auctionItem.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(auctionItem.id)
    expect(view.url).toBe(auctionItem.url)
    expect(view.owner).toBe(auctionItem.owner)
    expect(view.basePrice).toBe(auctionItem.basePrice)
    expect(view.status).toBe(auctionItem.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
