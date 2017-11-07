/**
 * The API file takes care of all calls to the backend,
 * to avoid cluttering the action creators, as well
 * as to give API access to native js code.
 * 
 * @todo Since we use common/api@apiRequest we skip including the "orders" api file, as it is redundant
 */
import {apiRequest} from '../common/api'

/** Fetch all orders */
const ordersFetchAll = (baseAction) => { return apiRequest('orders', baseAction) }

export default {
    ordersFetchAll
}