/**
 * The API file takes care of all calls to the backend,
 * to avoid cluttering the action creators, as well
 * as to give API access to native js code.
 * 
 * @todo Since we use common/api@apiRequest we skip including the "users" api file, as it is redundant
 */
import {apiRequest} from '../common/api'

/** Fetch all users */
const clientsFetchAll = (baseAction) => { return apiRequest('users', baseAction) }

export default {
    clientsFetchAll
}