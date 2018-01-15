import types from './actionTypes'
import {normalize, schema} from 'normalizr'
import merge from 'lodash/merge'
import {API_SUCCESS, API_REJECTED} from '../common/api'

const initialState = {
    isFetching: false,
    isDirty: false,
    byId: {},
    allIds: [],
    notify: null
}

function ordersReducer( state = initialState, action){
    switch(action.type){
        case `${types.ORDERS_FETCH_ALL}`: {
            return {
                ...state,
                isFetching: true
            }
        }

        case `${types.ORDERS_FETCH_ALL}${API_SUCCESS}`: {
            const {payload} = action

            return {
                ...state,
                isFetching: false,
                isDirty: false,
                ...payload
            }
        }

        case `${types.ORDERS_FETCH_ALL}${API_REJECTED}`: {
            return {
                ...state,
                isFetching: false,
                byId: {},
                allIds: []
            }
        }

        case `${types.ORDERS_CREATE}`: {
            return {
                ...state,
                isDirty: true
            }
        }
        case `${types.ORDERS_CREATE}${API_SUCCESS}`: {
            const {payload} = action
            const {byId, notify} = payload
            /*
            return {
                ...state,
                notify
            }*/

            // FIXME: New state here is not merged properly. Creates undefined subobjects
            // TODO: Check normalizer who supplies the payload here..
            return {
                ...state,
                allIds: state.allIds.concat(payload.allIds),
                byId: {...state.byId, ...byId},
                isDirty: false
            }
        }

        case `${types.ORDERS_CREATE}${API_REJECTED}`: {
            const {reason} = action.payload
            const {errors} = reason

            return {
                ...state,
                errors
            }
        }

        default:
            return state
    }
}

function ordersUiReducer( state = {
    selectedOrderId: 0
}, action ){
    switch(action.type){
        case types.ORDERS_PAGE_SELECTED_MASTER_ID:{
            return { ...state, selectedOrderId: action.payload}
        }
        
        default:
        return state
    }
}

export default {
    ordersUiReducer,
    ordersReducer
}