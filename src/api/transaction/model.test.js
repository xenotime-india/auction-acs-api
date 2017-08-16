import { Transaction } from '.'
import { User } from '../user'

let user, transaction

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  transaction = await Transaction.create({ user, auction-item: 'test', bid: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = transaction.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transaction.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.auction-item).toBe(transaction.auction-item)
    expect(view.bid).toBe(transaction.bid)
    expect(view.status).toBe(transaction.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = transaction.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transaction.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.auction-item).toBe(transaction.auction-item)
    expect(view.bid).toBe(transaction.bid)
    expect(view.status).toBe(transaction.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
