import { loadOrdersAction } from './actions'


/**
 * Expose module ID
 */
export { MODULE_ID } from './constants'


/**
 * Preloads for this module
 * @param {function} dispatch Redux store dispatch
 */
export const preload = dispatch => {
    dispatch(loadOrdersAction())
}

/**
 * Expose reducers
 */
export { default as reducer } from './reducer'

/**
 * Expose sagas
 */
export { watchOrdersLoad, watchOrdersCreated } from './sagas'