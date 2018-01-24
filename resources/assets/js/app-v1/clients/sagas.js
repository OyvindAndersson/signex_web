import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
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

export function* watchClientsLoad() {
    yield takeLatest(types.CLIENTS_LOAD, handleClientsLoad)
}

/**
 * CLIENTS_CREATE action means a client was SUCCESSFULLY created, and
 * the cache is now dirty..
 * @param {*} action 
 */
function handleClientsCreated(action) {

}

export function* watchClientsCreated() {
    yield takeLatest(types.CLIENTS_CREATE, handleClientsCreated)
}
