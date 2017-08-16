import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export AuctionItem, { schema } from './model'

const router = new Router()
const { url, owner, basePrice, status } = schema.tree

/**
 * @api {post} /auction-items Create auction item
 * @apiName CreateAuctionItem
 * @apiGroup AuctionItem
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam url Auction item's url.
 * @apiParam owner Auction item's owner.
 * @apiParam basePrice Auction item's basePrice.
 * @apiParam status Auction item's status.
 * @apiSuccess {Object} auctionItem Auction item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Auction item not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ url, owner, basePrice, status }),
  create)

/**
 * @api {get} /auction-items Retrieve auction items
 * @apiName RetrieveAuctionItems
 * @apiGroup AuctionItem
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} auctionItems List of auction items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /auction-items/:id Retrieve auction item
 * @apiName RetrieveAuctionItem
 * @apiGroup AuctionItem
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} auctionItem Auction item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Auction item not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /auction-items/:id Update auction item
 * @apiName UpdateAuctionItem
 * @apiGroup AuctionItem
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam url Auction item's url.
 * @apiParam owner Auction item's owner.
 * @apiParam basePrice Auction item's basePrice.
 * @apiParam status Auction item's status.
 * @apiSuccess {Object} auctionItem Auction item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Auction item not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ url, owner, basePrice, status }),
  update)

/**
 * @api {delete} /auction-items/:id Delete auction item
 * @apiName DeleteAuctionItem
 * @apiGroup AuctionItem
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Auction item not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
