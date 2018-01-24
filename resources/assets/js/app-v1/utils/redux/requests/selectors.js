import { find, curry } from 'lodash'
import { createSelector } from 'reselect'

const requestsStoreSelector = state => state.requests

export const queuedRequestsSelector = createSelector(
  requestsStoreSelector,
  requestsStore => requestsStore.queue,
);

export const pendingRequestsSelector = createSelector(
  requestsStoreSelector,
  requestsStore => requestsStore.pending,
);

/**
 * A factory function that creates a selector for the pending request of a given type
 */
export const createHasActiveRequestSelectorFor = curry(
(queuedRequestsSel, pendingRequestsSel, REQUEST_TYPE) =>
    createSelector(
      queuedRequestsSel,
      pendingRequestsSel,
      (queuedRequests, pendingRequests) =>
        !!(
          find(
            queuedRequests,
            request => request.meta.requestType === REQUEST_TYPE,
          ) ||
          find(
            pendingRequests,
            request => request.meta.requestType === REQUEST_TYPE,
          )
        ),
    ),
)(queuedRequestsSelector, pendingRequestsSelector);

/** 
 * Selector for ANY active resource loader 
*/
export const hasActiveRequestSelectorForAnyResource = curry(
  (queuedRequestsSel, pendingRequestsSel) =>
      createSelector(
        queuedRequestsSel,
        pendingRequestsSel,
        (queuedRequests, pendingRequests) =>
          !!(
            find(
              queuedRequests,
              request => _.endsWith(request.meta.requestType, '_LOAD'),
            ) ||
            find(
              pendingRequests,
              request => _.endsWith(request.meta.requestType, '_LOAD'),
            )
          ),
      ),
  )(queuedRequestsSelector, pendingRequestsSelector)

const failedRequestsSelector = createSelector(
  requestsStoreSelector,
  requestsStore => requestsStore.failed,
);

/**
 * A factory function that creates a selector for the failed request of a given type
 */
export const createFailedRequestSelectorFor = curry(
  (failedRequestsSel, REQUEST_TYPE) =>
    createSelector(
      failedRequestsSel,
      failedRequests => failedRequests[REQUEST_TYPE],
    ),
)(failedRequestsSelector);


/**
 * Selector to check if the modules' entity cache should be considered dirty 
*/
export const isEntityCacheDirty = (state, module) => {
  if(state.entities.hasOwnProperty(module)){
      return state.entities[module].isDirty
  } else {
      throw 'No such entity in store'
  }
}


/** 
 * Selector to check if a module is loading its data 
 **/
export const isLoadingModuleData = (state, module) => {
  if(state.entities.hasOwnProperty(module)){
      return createHasActiveRequestSelectorFor(`${_.toUpper(module)}_LOAD`)
  } else {
      throw 'No such module has entities in store'
  }
}