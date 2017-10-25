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

export default function( state = initialState, action){
    switch(action.type){
        case `${types.CLIENTS_FETCH_ALL}`: {
            return {
                ...state,
                isFetching: true
            }
        }

        case `${types.CLIENTS_FETCH_ALL}${API_SUCCESS}`: {
            const {payload} = action

            return {
                ...state,
                isFetching: false,
                isDirty: false,
                ...payload
            }
        }

        case `${types.CLIENTS_FETCH_ALL}${API_REJECTED}`: {
            return {
                ...state,
                isFetching: false
            }
        }
        default:
        return state
    }
}