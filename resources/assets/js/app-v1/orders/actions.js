import actionTypes from './actionTypes'
import {apiRequest, apiPostRequest} from '../common/api'
import {clientsNormalizer, singleOrderNormalizer} from './schema'


/** Fetches all orders from the API */
//export function ordersFetchAll() { return apiRequest('orders', actionTypes.ORDERS_FETCH_ALL, null, ordersNormalizer) }

/** Creates a new order and persists in database */
//export function ordersCreate(newOrder) { return apiPostRequest('orders/create', actionTypes.ORDERS_CREATE, newOrder, singleOrderNormalizer) }
