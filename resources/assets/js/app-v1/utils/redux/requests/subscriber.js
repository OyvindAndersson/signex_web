import { curry, throttle, isFunction } from 'lodash'
import invariant from 'invariant'
import { queuedRequestsSelector, pendingRequestsSelector } from './selectors'

import {
  ADD_PENDING_REQUEST,
  ADD_FAILED_REQUEST,
  CLEAR_QUEUED_REQUEST,
  FINALIZE_REQUEST,
} from '../constants'

export function buildClearQueuedRequestAction(queuedRequest) {
  return {
    ...queuedRequest,
    type: CLEAR_QUEUED_REQUEST,
  };
}

export function buildPendingRequestAction( store, { meta: { requestType, request }, payload } ) {
  return {
    type: ADD_PENDING_REQUEST,
    meta: {
      requestType,
      request: request(payload) // Request function must return a promise
        .then(({ response, error }) => {
          if (error) {
            store.dispatch({
              type: ADD_FAILED_REQUEST,
              error: true,
              payload: error,
              meta: {
                requestType,
                requestPayload: payload,
              },
            });
          } else {
            store.dispatch({
              type: requestType,
              payload: response,
              meta: {
                requestPayload: payload,
              },
            });
          }
        })
        .then(() => {
          store.dispatch({
            type: FINALIZE_REQUEST,
            meta: {
              requestType,
            },
            payload,
          });
        }),
    },
    payload,
  };
}

export function requestsMatch(requestOne, requestTwo) {
  return (
    requestOne === requestTwo ||
    (requestOne.meta.requestType === requestTwo.meta.requestType &&
      requestOne.payload === requestTwo.payload)
  );
}

export function isRequestUnique(request, queuedRequests, pendingRequests) {
  const matcher = curry(requestsMatch)(request);

  // see if this request exists more than once in the request queue....
  const matchingQueuedRequests = queuedRequests.filter(matcher);
  if (matchingQueuedRequests.length > 1) {
    return false;
  }

  // not double-queued, see if this request is already pending...
  return !pendingRequests.find(matcher);
}

/**
 * Works as a gate to check requests if they are requests to cached
 * resources. If the request has nothing to do with caching, it is
 * let through the gate.
 * If it has cache meta-data, it is checked to see if the request
 * should be let through or not.
 * 
 * @param {*} currentState 
 * @param {*} request 
 * @returns true if it should be let through, false if not
 */
export function cachedResourceRequestGate(currentState, request) {

  // Does this request have any metadata pertaining cache info?
  if(request.meta.checkCache && request.meta.checkCache === true) {

    if( request.meta.cacheSelector(currentState) ){
      console.debug(`%cCache for [${request.meta.requestType}] is marked dirty.`, 'color: #CC77AA')
      return true

    } else {
      console.debug(`%cCache for [${request.meta.requestType}] is marked clean.`, 'color: #55FFAA')
      return false
    }

  } else {
    // This is a normal request, or the cache should not be checked. Let it through.
    console.debug(`%cNo cache meta for [${request.meta.requestType}].`, 'color: #555')
    return true
  }
}

export function handleRequestsQueueChange(store) {
  const currentState = store.getState()
  const queuedRequests = queuedRequestsSelector(currentState)

  // Do we have any queued request lined up?
  if (queuedRequests.length > 0) {
    
    const pendingRequests = pendingRequestsSelector(currentState)

    queuedRequests.forEach(queuedRequest => {

      // If it's clean-cached, dont even add to pending.
      if(!cachedResourceRequestGate(currentState, queuedRequest)){
        const clearQueuedRequestAction = buildClearQueuedRequestAction(queuedRequest)
        store.dispatch(clearQueuedRequestAction)

        console.debug(`%cThe request [${queuedRequest.meta.requestType}] was cleared.`, 'color: #55FFAA')
        return true
      }

      if (isRequestUnique(queuedRequest, queuedRequests, pendingRequests)) {
        // If this is unique, dispatch it
        const pendingRequestAction = buildPendingRequestAction(store, queuedRequest)
        store.dispatch(pendingRequestAction)

      } else {
        // If this request is not unique, clear it
        const clearQueuedRequestAction = buildClearQueuedRequestAction(queuedRequest)
        store.dispatch(clearQueuedRequestAction)

      }
      return true;
    });
  }
}

function addSubscriber(store) {
  const onStateChange = throttle(() => {
    handleRequestsQueueChange(store);
  }, 16);
  return store.subscribe(onStateChange);
}

export default addSubscriber;
