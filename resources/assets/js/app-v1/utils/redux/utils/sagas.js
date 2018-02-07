import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import invariant from 'invariant'
import * as defaultActionTypes from '../../../constants'
import { restActionTypes, restActionModifiers } from '../constants'

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
            const { payload: { data }} = action || { payload: { data: {}}}

            if(!data || data.length == 0){
                return
            } else {
                const payloadData = yield call(actionPayloadHandler, action.payload.data)
                yield put({
                    type: effectAction,
                    payload: payloadData
                })
            }
            
        } catch(e){

        }
    }

    return function* watcherSaga() {
        yield takeLatest(causeAction, callback)
    }
}

export function createActionNormalizerSaga(moduleId, restActionType = restActionTypes.LOAD, normalizer) {
    invariant(_.isFunction(normalizer), 'Expected normalizer to be a function')

    const causeAction = `${moduleId}_${restActionType}`.toUpperCase()
    const effectAction = `${causeAction}_${restActionModifiers.NORMALIZED}`

    return createCauseAndEffectSaga(causeAction, effectAction, normalizer)
}