import { combineReducers } from 'redux'
import moment from 'moment'

import { MODULE_ID } from './constants'
import types from './actionTypes'

import { 
    createForNormalizedEntities, 
    createForNormalizedEntityIds, 
    createForModuleCache } from 'AppUtils/redux/utils/createEntityResourceReducer'
/*
|--------------------------------------------------------------------------
| Ordertypes Entity reducers
|--------------------------------------------------------------------------
|
| The entity reducers handles all actions related to the clients entity
| The state section for the clients entities are shaped like this:
|
*/

const entityReducer = combineReducers({
    cache: createForModuleCache(MODULE_ID, moment().add(1, 'month')) ,
    byId: createForNormalizedEntities(MODULE_ID),
    allIds: createForNormalizedEntityIds(MODULE_ID)
})

/*
|--------------------------------------------------------------------------
| Ordertypes UI reducers
|--------------------------------------------------------------------------
|
| The UI reducers handles all actions related to the UI of '/clients'
| pages
|
*/
function uiReducer( state = {}, action ){
    return state
}

export default {
    entityReducer,
    uiReducer
}