import { curry, throttle } from 'lodash'
import { queuedRequestsSelector, pendingRequestsSelector, isEntityCacheDirty } from './selectors'

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
 * Intercept any queued requests for resource-loads that should be stopped
 * if the resource is already cached (not dirty). The store/state is checked for
 * a cached resource for the given module (i.e: state.entities.clients.isDirty).
 * If 'isDirty' is true, the resource SHOULD however reload, so let the request
 * be queued as normal.
 * 
 * @todo Check for load action-types in a more failsafe way
 * @todo Store module's name as meta? Perhaps by create meta func for createRequestAction.js
 * @todo Dispatch a request if the queued request is ignored?
 * 
 * @param {*} currentState 
 * @param {*} request 
 */
export function shouldStopRequestForCachedResource(currentState, request) {

  if(request.meta.requestType.indexOf('_LOAD') !== -1) {

    // Extract the modules' name - which, by rule, should be the first string before the first '_'
    const module = _.head(_.split(_.toLower(request.meta.requestType), '_'))
    if(module.length > 0){
      // Select the appropriate section of the entity state
      let isDirty = isEntityCacheDirty(currentState, module)

      console.debug(`%c Cache for [${request.meta.requestType}] is marked ${isDirty ? '' : 'not'} dirty.`, 
        `color: ${isDirty ? '#CC77AA' : '#55FFAA'}`)

      // False: we should - not - stop the resource-load if the cache is dirty!
      // True: The cache is not dirty; stop the request!
      return isDirty ? false : true

    } else {
      console.debug(`%c A module resource load request-type was expected. Got ${request.meta}`, 'color: #CC77AA')
    }

  } else {
    return false
  }
}

export function handleRequestsQueueChange(store) {
  const currentState = store.getState()
  const queuedRequests = queuedRequestsSelector(currentState)

  // Do we have any queued request lined up?
  if (queuedRequests.length > 0) {
    
    const pendingRequests = pendingRequestsSelector(currentState)

    queuedRequests.forEach(queuedRequest => {

      // If it's cached, dont even add to pending.
      if(shouldStopRequestForCachedResource(currentState, queuedRequest)){
        const clearQueuedRequestAction = buildClearQueuedRequestAction(queuedRequest)
        store.dispatch(clearQueuedRequestAction)

        console.debug(`%c The request [${queuedRequest.meta.requestType}] was cleared.`, 'color: #55FFAA')
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
