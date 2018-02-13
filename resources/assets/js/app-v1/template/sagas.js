import { restActionTypes } from 'AppUtils/redux/constants'
import { createCauseAndEffectSaga, createActionNormalizerSaga } from 'AppUtils/redux/utils/sagas'

import { MODULE_ID } from './constants'
import { usersNormalizer } from './schema'

/** Normalizes entities from the api response and dispatches a new action with the normalized data */
export const watchUsersLoad = createActionNormalizerSaga(MODULE_ID, restActionTypes.LOAD, usersNormalizer)
