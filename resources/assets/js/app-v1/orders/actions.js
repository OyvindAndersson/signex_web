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
import { createRequestAction, createRequestActionForCacheable } from 'AppUtils/redux/utils/createRequestAction'
import { apiGet, apiPost } from '../api'
import api from './api'
import types from './actionTypes'
import { isCacheDirtySelector } from './selectors'


const loadOrders = () => apiGet(api.API_ORDERS_LOAD_ROUTE)
export const loadOrdersAction = createRequestActionForCacheable(
    types.ORDERS_LOAD, 
    loadOrders, 
    isCacheDirtySelector
)