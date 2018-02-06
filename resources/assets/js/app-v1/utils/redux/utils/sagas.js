import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import invariant from 'invariant'
import * as defaultActionTypes from '../../../constants'

/**
 * Takes an action with a payload and runs it through a handler function, which
 * in turn dispatches a new action with the payload data
 * 
 * @param {string} causeAction The action to 'take'/handle
 * @param {string} effectAction The action being dispatched with the generated payload
 * @param {function} actionPayloadHandler A function that returns the payload to send with the effect
 * action.
 */
export function createCauseAndEffectSaga(causeAction, effectAction, actionPayloadHandler){
    invariant( _.isFunction(actionPayloadHandler), 'Expected actionPayloadHandler to be a function')

    function* callback(action) {
        try {
            const data = yield call(actionPayloadHandler, action.payload.data)
            yield put({
                type: effectAction,
                payload: data
            })
        } catch(e){

        }
    }

    return function* watcherSaga() {
        yield takeLatest(causeAction, callback)
    }
}