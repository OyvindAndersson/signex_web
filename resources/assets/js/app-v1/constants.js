/**
 * Application constants
 */

export const BASE_API_URL = '/api' // /api

/** Common action-type suffixes for entity-based modules */
export const LOAD = '_LOAD'
export const LOAD_NORMALIZED = '_LOAD_NORMALIZED'
export const CREATE = '_CREATE'
export const CREATE_NORMALIZED = '_CREATE_NORMALIZED'
export const EDIT = '_EDIT'
export const EDIT_NORMALIZED = '_EDIT_NORMALIZED'

export const INVALIDATE_CACHE = '_INVALIDATE_CACHE'

export const modActionType = (moduleName = '', suffix = '') => `${moduleName}${suffix}`