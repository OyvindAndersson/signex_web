import { loadUsersAction } from './actions'

/**
 * Expose module ID
 */
export { MODULE_ID } from './constants'

/**
 * Preloads for this module
 * @param {function} dispatch Redux store dispatch
 */
export const preload = dispatch => {
    dispatch(loadUsersAction())
}

/**
 * Expose reducers
 */
export { default as reducer } from './reducer'

/**
 * Expose sagas
 */
export { watchUsersLoad } from './sagas'