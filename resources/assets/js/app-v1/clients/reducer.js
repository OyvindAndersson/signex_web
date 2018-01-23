import types from './actionTypes'
import {normalize, schema} from 'normalizr'
import merge from 'lodash/merge'

/*
|--------------------------------------------------------------------------
| Clients Entity reducers
|--------------------------------------------------------------------------
|
| The entity reducers handles all actions related to the clients entity
|
*/

const initialEntityState = {
    isFetching: false,
    isDirty: false,
    byId: {},
    allIds: []
}

function entityReducer( state = initialEntityState, action){
    switch(action.type){
        case types.CLIENTS_LOAD_NORMALIZED:return loadNormalizedResourceHandler(state, action)
        default:
            return state
    }
}

function loadNormalizedResourceHandler(state, action){
    ///console.log("CLIENTS REDUCER:")
    //console.log(action)
    return {
        ...state,
        ...action.payload
    }
}

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
    selectedClientId: 0
}

function uiReducer( state = initialUiState, action ){
    switch(action.type){
        case types.CLIENTS_UI_SELECTED_MASTER_ID:{
            return { ...state, selectedClientId: action.payload}
        }
        default:
            return state
    }
}

export default {
    entityReducer,
    uiReducer
}