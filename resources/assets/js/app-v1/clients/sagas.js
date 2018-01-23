import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import requestTypes from 'AppUtils/redux/constants'
import types from './actionTypes'
import { clientsNormalizer } from './schema'

/**
 * Normalize client entities data from server
 * @param {*} data 
 */
function normalizeData(data){
    return clientsNormalizer(data)
}

/**
 * Post-process CLIENTS_LOAD response
 * We need to normalize or load from cache
 * @param {*} action 
 */
function* handleClientsLoad(action){
    try {
        const normalizedData = yield call(normalizeData, action.payload.data)
        yield put({ type: types.CLIENTS_LOAD_NORMALIZED, payload: normalizedData })
    } catch(e){
        yield call(console.log, e)
    }
}

function* clientsSaga() {
    yield takeLatest(types.CLIENTS_LOAD, handleClientsLoad)
}

/*
function* checkClientsCache() {
    yield takeLatest(requestTypes.ADD_PENDING_REQUEST, checkCacheFirst)
}*/

export default clientsSaga