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
| Clients Entity reducers
|--------------------------------------------------------------------------
|
| The entity reducers handles all actions related to the clients entity
| The state section for the clients entities are shaped like this:
|
*/

const entityReducer = combineReducers({
    cache: createForModuleCache(MODULE_ID) ,
    byId: createForNormalizedEntities(MODULE_ID),
    allIds: createForNormalizedEntityIds(MODULE_ID)
})

/*
|--------------------------------------------------------------------------
| Clients UI reducers
|--------------------------------------------------------------------------
|
| The UI reducers handles all actions related to the UI of '/clients'
| pages
|
*/

const initialUiState = {
    selectedClientId: 0,
    clientCreatedSuccess: false
}

function uiReducer( state = initialUiState, action ){
    switch(action.type){
        case types.CLIENTS_UI_SELECTED_MASTER_ID: return { ...state, selectedClientId: action.payload }
        case types.CLIENTS_CREATE: return clientCreatedUIHandler(state, action)
        default:
            return state
    }
}

function clientCreatedUIHandler(state,action){
    return {
        ...state,
        clientCreatedSuccess: true
    }
}

export default {
    entityReducer,
    uiReducer
}