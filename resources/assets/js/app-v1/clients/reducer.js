import types from './actionTypes'
import { combineReducers } from 'redux'
import moment from 'moment'

/*
|--------------------------------------------------------------------------
| Clients Entity reducers
|--------------------------------------------------------------------------
|
| The entity reducers handles all actions related to the clients entity
| The state section for the clients entities are shaped like this:
|   state.entities.clients = {
|        cache: {}, 
|        byId: {},
|        allIds: []
|    }
|
*/

function addAllNormalizedClients(state, action){
    const { byId } = action.payload

    if( byId ){
        return {
            ...state,
            ...byId
        }
    } else {
        return state
    }
}

function addSingleNormalizedClient(state, action) {
    const { byId, allIds } = action.payload
    return { 
        ...state, 
        [allIds]: byId[allIds] 
    }
}

function addAllClientIds(state, action) {
    const { allIds } = action.payload

    if( allIds ){
        return _.union(state, allIds)
    } else {
        return state
    }
}

function addSingleClientId(state, action){
    const { allIds } = action.payload

    if( allIds ){
        return _.union(state, allIds)
    } else {
        return state
    }
}

/**
 * Main slice for the 'cache' section
 * @param {*} state 
 * @param {*} action 
 */
function clientsCache( state = { isDirty: true }, action){
    switch(action.type){
        case types.CLIENTS_LOAD_NORMALIZED:
            return { 
                ...state,
                isDirty: false, 
                expiresAt: moment().add(1, 'm') 
            }
        //case types.CLIENTS_CREATE: return { isDirty: true }
        default: return state
    }
}

/**
 * Main slice for the 'byId' section
 * @param {*} state 
 * @param {*} action 
 */
function clientsById(state = {}, action) {
    switch(action.type){
        case types.CLIENTS_LOAD_NORMALIZED: return addAllNormalizedClients(state, action)
        case types.CLIENTS_CREATE_NORMALIZED: return addSingleNormalizedClient(state, action)
        default: return state
    }
} 

/**
 * Main slice for the 'allIds' section
 * @param {*} state 
 * @param {*} action 
 */
function allClientIds(state = [], action) {
    switch(action.type){
        case types.CLIENTS_LOAD_NORMALIZED: return addAllClientIds(state, action)
        case types.CLIENTS_CREATE_NORMALIZED: return addSingleClientId(state, action)
        default: return state
    }
}

const entityReducer = combineReducers({
    cache: clientsCache,
    byId: clientsById,
    allIds: allClientIds
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