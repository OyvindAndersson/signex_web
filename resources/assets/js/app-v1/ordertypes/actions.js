/*
|--------------------------------------------------------------------------
| Ordertypes module actions
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

export const loadOrdertypesAction = createApiRequestAction('GET', MODULE_ID, restActionTypes.LOAD, true, isCacheDirtySelector)