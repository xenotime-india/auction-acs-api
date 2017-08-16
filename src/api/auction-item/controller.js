import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { AuctionItem } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  AuctionItem.create(body)
    .then((auctionItem) => auctionItem.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  AuctionItem.find(query, select, cursor)
    .then((auctionItems) => auctionItems.map((auctionItem) => auctionItem.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  AuctionItem.findById(params.id)
    .then(notFound(res))
    .then((auctionItem) => auctionItem ? auctionItem.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  AuctionItem.findById(params.id)
    .then(notFound(res))
    .then((auctionItem) => auctionItem ? _.merge(auctionItem, body).save() : null)
    .then((auctionItem) => auctionItem ? auctionItem.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  AuctionItem.findById(params.id)
    .then(notFound(res))
    .then((auctionItem) => auctionItem ? auctionItem.remove() : null)
    .then(success(res, 204))
    .catch(next)
