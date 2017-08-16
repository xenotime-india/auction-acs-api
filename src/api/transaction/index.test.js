import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Transaction } from '.'

const app = () => express(routes)

let userSession, adminSession, transaction

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  transaction = await Transaction.create({ user })
})

test('POST /transactions 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, auction-item: 'test', bid: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.auction-item).toEqual('test')
  expect(body.bid).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /transactions 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /transactions 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /transactions 401 (user)', async () => {
  const { status } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /transactions 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /transactions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${transaction.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(transaction.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /transactions/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${transaction.id}`)
  expect(status).toBe(401)
})

test('GET /transactions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
