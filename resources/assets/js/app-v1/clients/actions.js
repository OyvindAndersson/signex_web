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
import { restActionTypes } from 'AppUtils/redux/constants'
import { createApiRequestAction } from '../api'

import { MODULE_ID } from './constants'
import { isCacheDirtySelector } from './selectors'
import types from './actionTypes'

/**
 * Load all client entities. Normalization handled in sagas.js
 * @see sagas.js
 */
export const loadClientsAction = createApiRequestAction(
    'GET',
    MODULE_ID, 
    restActionTypes.LOAD,
    true,
    isCacheDirtySelector
)

/**
 * Sends create request to the server for creating a new Client
 * @param {object|array} payload Single or multiple client form data
 */
export const createClientAction = createApiRequestAction(
    'POST',
    MODULE_ID, 
    restActionTypes.CREATE
)


/**
 * Update selected client action (UI)
 * Used primarily in master/detail view. Master list item id
 */
export const updateClientsMasterListItemIdAction = (clientId) => ({
    type: types.CLIENTS_UI_SELECTED_MASTER_ID, 
    payload: clientId
})