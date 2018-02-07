// For Request Management
export const ADD_FAILED_REQUEST = 'ADD_FAILED_REQUEST';
export const ADD_PENDING_REQUEST = 'ADD_PENDING_REQUEST';
export const CLEAR_FAILED_REQUEST = 'CLEAR_FAILED_REQUEST';
export const CLEAR_QUEUED_REQUEST = 'CLEAR_QUEUED_REQUEST';
export const FINALIZE_REQUEST = 'FINALIZE_REQUEST';
export const QUEUE_REQUEST = 'QUEUE_REQUEST';

/**
 * REST api actions
 */
export const restActionTypes = {
    LOAD: 'LOAD',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
  }
/**
 * Modifiers of common rest actions
 * I.e: normalized would be appended as such: *_LOAD_NORMALIZED
 * as a response to a regular *_LOAD action for entities that
 * come raw/unnormalized from the API
 */
export const restActionModifiers = {
  NORMALIZED: 'NORMALIZED'
}