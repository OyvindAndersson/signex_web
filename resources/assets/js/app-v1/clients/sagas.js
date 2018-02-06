import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import types from './actionTypes'
import { clientsNormalizer, singleClientNormalizer } from './schema'
import { createCauseAndEffectSaga } from 'AppUtils/redux/utils/sagas'

/** Normalizes entities from the api response and dispatches a new action with the normalized data */
export const watchClientsLoad = createCauseAndEffectSaga(
    types.CLIENTS_LOAD, 
    types.CLIENTS_LOAD_NORMALIZED,
    clientsNormalizer
)

/** Intercepts clients create action and normalizes the response as payload to new action */
export const watchClientsCreated = createCauseAndEffectSaga(
    types.CLIENTS_CREATE,
    types.CLIENTS_CREATE_NORMALIZED,
    singleClientNormalizer
)
