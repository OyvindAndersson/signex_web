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
| Orders Entity reducers
|--------------------------------------------------------------------------
|
| The entity reducers handles all actions related to the clients entity
| The state section for the clients entities are shaped like this:
|
*/
const entityReducer = combineReducers({
    cache: createForModuleCache(MODULE_ID),
    byId: createForNormalizedEntities(MODULE_ID),
    allIds: createForNormalizedEntityIds(MODULE_ID)
})

function uiReducer( state = {selectedOrderId: 0 }, action ){
    switch(action.type){
        case types.ORDERS_UI_SELECTED_MASTER_ID:{
            return { ...state, selectedOrderId: action.payload}
        }
        
        default:
        return state
    }
}

export default {
    uiReducer,
    entityReducer
}