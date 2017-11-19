import types from './actionTypes'
import {normalize, schema} from 'normalizr'
import merge from 'lodash/merge'
import {API_SUCCESS, API_REJECTED} from '../common/api'

const initialState = {
    isFetching: false,
    isDirty: false,
    byId: {},
    allIds: []
}

function clientsReducer( state = initialState, action){
    switch(action.type){
        case `${types.CLIENTS_FETCH_ALL}`: {
            return {
                ...state,
                isFetching: true
            }
        }

        case `${types.CLIENTS_FETCH_ALL}${API_SUCCESS}`: {
            return {
                ...state,
                isFetching: false,
                isDirty: false,
                ...action.payload
            }
        }

        case `${types.CLIENTS_FETCH_ALL}${API_REJECTED}`: {
            return {
                ...state,
                isFetching: false,
                byId: {},
                allIds: []
            }
        }

        case `${types.CLIENTS_CREATE}${API_SUCCESS}`: {
            const {payload} = action
            const {byId} = payload
            
            return {
                ...state,
                allIds: state.allIds.concat(payload.allIds), // add the new ID ref.
                byId: {...state.byId, ...byId}, // add the new client in with the old ones,
                isDirty: true
            }
        }
        default:
        return state
    }
}

function clientsUiReducer( state = {
    selectedClientId: 0
}, action ){
    switch(action.type){
        case types.CLIENTS_PAGE_SELECTED_MASTER_ID:{
            return { ...state, selectedClientId: action.payload}
        }
        default:
        return state
    }
}

export default {
    clientsUiReducer,
    clientsReducer
}