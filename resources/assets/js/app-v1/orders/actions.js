/*
|--------------------------------------------------------------------------
| Orders module actions
|--------------------------------------------------------------------------
|
| Define actions specifically for the module -> api endpoints.
| Simple API endpoint actions are defined here. Other more 
| advanced post-processing is done with sagas, defined in
| this modules' sagas.js
|
*/
import { restActionTypes } from 'AppUtils/redux/constants'
import { createRequestActionForCacheable } from 'AppUtils/redux/utils/createRequestAction'
import { createApiRequestAction, apiGet } from '../api'

import { MODULE_ID } from './constants'
import { isCacheDirtySelector } from './selectors'
import types from './actionTypes'

export const loadOrdersAction = createApiRequestAction('GET', MODULE_ID, restActionTypes.LOAD, true, isCacheDirtySelector)

export const createOrderAction = createApiRequestAction('POST', MODULE_ID, restActionTypes.CREATE)

const loadOrderTypesAction = apiGet('ordertypes')

/**
 * Update selected client action (UI)
 * Used primarily in master/detail view. Master list item id
 */
export const updateOrdersMasterListItemIdAction = (clientId) => ({
    type: types.ORDERS_UI_SELECTED_MASTER_ID, 
    payload: clientId
})