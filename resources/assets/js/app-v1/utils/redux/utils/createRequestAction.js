import invariant  from "invariant"
import { identity, isFunction, isNull } from 'lodash'

import { QUEUE_REQUEST, restActionTypes } from '../constants'

export function createRequestAction(type, request, payloadCreator = identity, metaCreator) {
  invariant(isFunction(request), 'Expected request to be a function');

  invariant(
    isFunction(payloadCreator) || isNull(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null',
  );

  const finalPayloadCreator =
    isNull(payloadCreator) || payloadCreator === identity
      ? identity
      : (head, ...args) => head instanceof Error ? head : payloadCreator(head, ...args);

  const hasMeta = isFunction(metaCreator);

  const actionCreator = (...args) => {
    const payload = finalPayloadCreator(...args);
    const action = {
      type: QUEUE_REQUEST,
      meta: { request, requestType: type },
    };
    
    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    if (hasMeta) {
      const otherMeta = metaCreator(...args)
      action.meta = { ...action.meta, ...otherMeta }
    }

    return action;
  };

  return actionCreator;
}

/**
 * 
 * @param {string} moduleId 
 * @param {string} restAction Either of: LOAD | CREATE | UPDATE | DELETE. 
 * You can also import restActionTypes object from here.
 * @param {function} request ACtual request function
 * @param {boolean} isCacheable If the action is returning a cacheable resource, that should enter the
 * cache system.
 * @param {function} selector A selector for the cache-state for the resource
 */
export function createRestRequestAction(moduleId, restAction = restActionTypes.LOAD, request, isCacheable = false, selector = null) {
  invariant(_.has(restActionTypes, restAction.toUpperCase()), 
    'Expected restactionTypes to be either of: load, create, update, delete.')

  invariant(_.isString(moduleId), 'Expected moduleId to be a string')

  if(isCacheable){
    // Check if the selector is a valid function
    invariant( isFunction(selector), 'Expected cacheSelector to be a function')

    var metaCreator = () => { return { checkCache: true, cacheSelector: selector }}
  }

  // Prepend the module ID (i.e: USERS_LOAD)
  const type = `${moduleId}_${restAction}`.toUpperCase()

  return createRequestAction(
    type, 
    request, 
    null, 
    isCacheable ? metaCreator : null
  )
}

/**
 * Create a request-action that attaches meta-data for the request-system to check
 * if the data for the request is cached or not.
 * 
 * @param {string} type - The request type (i.e: USERS_FETCH_ALL)
 * @param {function} request - The request function returning a promise
 * @param {function} selector - The selector for selecting the cache-status in state.
 * I.e: a property in the state that marks the cache dirty or clean (true|false)
 */
export function createRequestActionForCacheable(type, request, selector) {

  // Check if the selector is a valid function
  invariant( isFunction(selector), 'Expected cacheSelector to be a function')

  const metaCreator = () => { return { checkCache: true, cacheSelector: selector }}

  return createRequestAction(type, request, null, metaCreator)
}