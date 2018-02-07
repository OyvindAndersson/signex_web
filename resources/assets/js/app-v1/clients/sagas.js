import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { MODULE_ID } from './constants'
import { clientsNormalizer, singleClientNormalizer } from './schema'

import { restActionTypes } from 'AppUtils/redux/constants'
import { createCauseAndEffectSaga, createActionNormalizerSaga } from 'AppUtils/redux/utils/sagas'

/** Normalizes entities from the api response and dispatches a new action with the normalized data */
export const watchClientsLoad = createActionNormalizerSaga(MODULE_ID, restActionTypes.LOAD, clientsNormalizer)

/** Intercepts clients create action and normalizes the response as payload to new action */
export const watchClientsCreated = createActionNormalizerSaga(MODULE_ID, restActionTypes.CREATE, singleClientNormalizer)
