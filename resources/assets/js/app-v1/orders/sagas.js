import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { restActionTypes } from 'AppUtils/redux/constants'
import { createCauseAndEffectSaga, createActionNormalizerSaga } from 'AppUtils/redux/utils/sagas'

import { MODULE_ID } from './constants'
import { ordersNormalizer, singleOrderNormalizer } from './schema'

/** Normalizes entities from the api response and dispatches a new action with the normalized data */
export const watchOrdersLoad = createActionNormalizerSaga(MODULE_ID, restActionTypes.LOAD, ordersNormalizer)

/** Intercepts order create action and normalizes the response as payload to new action */
export const watchOrdersCreated = createActionNormalizerSaga(MODULE_ID, restActionTypes.CREATE, singleOrderNormalizer)
