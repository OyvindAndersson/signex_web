/*
|--------------------------------------------------------------------------
| Clients module actions
|--------------------------------------------------------------------------
|
| Define actions specifically for the module -> api endpoints.
| Simple API endpoint actions are defined here. Other more 
| advanced post-processing is done with sagas, defined in
| this modules' sagas.js
|
*/
import { createRequestAction, createRequestActionForCacheable } from 'AppUtils/redux/utils/createRequestAction'
import { apiGet, apiPost } from '../api'
import api from './api'
import types from './actionTypes'
import { isCacheDirtySelector } from './selectors'

/**
 * Load all client entities. Normalization handled in sagas.js
 * @see sagas.js
 */
const loadClients = () => apiGet(api.API_CLIENTS_LOAD_ROUTE)
export const loadClientsAction = createRequestActionForCacheable(
    types.CLIENTS_LOAD, 
    loadClients, 
    isCacheDirtySelector
)

/**
 * Sends create request to the server for creating a new Client
 * @param {object|array} payload Single or multiple client form data
 */
const createClient = (payload) => apiPost(api.API_CLIENTS_CREATE_ROUTE, payload)
export const createClientAction = createRequestAction(types.CLIENTS_CREATE, createClient)

/**
 * Update selected client action (UI)
 * Used primarily in master/detail view. Master list item id
 */
export const updateClientsMasterListItemIdAction = (clientId) => ({
    type: types.CLIENTS_UI_SELECTED_MASTER_ID, 
    payload: clientId
})