import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show } from './controller'
import { schema } from './model'
export Transaction, { schema } from './model'

const router = new Router()
const { auctionItem, bid, status } = schema.tree

/**
 * @api {post} /transactions Create transaction
 * @apiName CreateTransaction
 * @apiGroup Transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam auction-item Transaction's auction-item.
 * @apiParam bid Transaction's bid.
 * @apiParam status Transaction's status.
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ auctionItem, bid, status }),
  create)

/**
 * @api {get} /transactions Retrieve transactions
 * @apiName RetrieveTransactions
 * @apiGroup Transaction
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} transactions List of transactions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /transactions/:id Retrieve transaction
 * @apiName RetrieveTransaction
 * @apiGroup Transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

export default router
