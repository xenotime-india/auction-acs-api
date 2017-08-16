import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { AuctionItem } from '.'

const app = () => express(routes)

let userSession, adminSession, auctionItem

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  auctionItem = await AuctionItem.create({})
})

test('POST /auction-items 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: adminSession, url: 'test', owner: 'test', basePrice: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.url).toEqual('test')
  expect(body.owner).toEqual('test')
  expect(body.basePrice).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /auction-items 401 (user)', async () => {
  const { status } = await request(app())
    .post('/')
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /auction-items 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /auction-items 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /auction-items 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /auction-items/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${auctionItem.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(auctionItem.id)
})

test('GET /auction-items/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${auctionItem.id}`)
  expect(status).toBe(401)
})

test('GET /auction-items/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /auction-items/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${auctionItem.id}`)
    .send({ access_token: userSession, url: 'test', owner: 'test', basePrice: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(auctionItem.id)
  expect(body.url).toEqual('test')
  expect(body.owner).toEqual('test')
  expect(body.basePrice).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /auction-items/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${auctionItem.id}`)
  expect(status).toBe(401)
})

test('PUT /auction-items/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: userSession, url: 'test', owner: 'test', basePrice: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /auction-items/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`/${auctionItem.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /auction-items/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${auctionItem.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /auction-items/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${auctionItem.id}`)
  expect(status).toBe(401)
})

test('DELETE /auction-items/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
