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
import { createRequestAction } from 'AppUtils/redux/utils/createRequestAction'
import { apiGet, apiPost } from '../api'
import clientsApiRoutes from './api'
import actionTypes from './actionTypes'

/**
 * Load Clients Action
 * Retrieves all clients from the API.
 * Normalization and other post-process logic is defined in
 * the modules' sagas.
 */
const loadClients = () => { return apiGet(clientsApiRoutes.API_LOAD) }
export const loadClientsAction = createRequestAction(actionTypes.CLIENTS_LOAD, loadClients)

const createClient = (payload) => { return apiPost(clientsApiRoutes.API_CREATE, payload )}
export const createClientAction = createRequestAction(actionTypes.CLIENTS_CREATE, createClient)

/**
 * Update selected client action (UI)
 * Used primarily in master/detail view. Master list item id
 */
export const updateClientsMasterListItemIdAction = (clientId) => ({
    type: actionTypes.CLIENTS_UI_SELECTED_MASTER_ID, 
    payload: clientId
})