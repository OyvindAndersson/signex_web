# SignEx App js framework

The minimum required modules for this app to work are:

- auth : Handles all authentication routines and supplies helpers and components
- common : Defines components used in general to form the web-design. Provides layout components for any other module to use.
- setup : Initial setup of Redux, cache, routes and store related functionality
- utils : Several utilities required of the app, most importantly the cache and api-request baseline

Everything is tied together in ./index.js.

## Modules

A module consists of either components and associated resources, or both.

- A presentational module will generally only consist of react components.
- A resource module will generally only consist of REST-actions, reducers and sagas
- A mixed module will naturally consist of both, along with UI reducers/actions.

See the 'template' module for an example of the bare minimum of a working mixed module, with a master/detail presentation.

## Requests and the API

The API request system is a modified version of this: https://github.com/andrewtpoe/request-answers
See the docs for it to get a base understanding of the general system.

### Creating requests for the system

A request can be made for this system at the most basic level by using the `createRequestAction` helper in Utils/redux/utils.
Every request-action made with this function will use the request management the exact same way as the base-api https://github.com/andrewtpoe/request-answers.

The main difference of the custom implementation is the cache-functionality. All queued requests are checked for a `checkCache` meta property.
If this is true, a meta property (which is a standard redux selector) `cacheSelector` should check the redux-state for a property that defines if the relevant cache is clean or dirty. If the cache is clean, the queued request is removed immediatly from the queue without further processing.

However, using `createRequestAction` (the core function) without extending it will not cause a cache-check since no meta-property of chechCache is set there.
Use the `createRequestActionForCacheable` or `createRestRequestAction`, which simply extends the core-function with a meta creator function:

```javascript
export function createRequestActionForCacheable(type, request, selector) {
  // Check if the selector is a valid function
  invariant( isFunction(selector), 'Expected cacheSelector to be a function')

  const metaCreator = () => { return { checkCache: true, cacheSelector: selector }}

  return createRequestAction(type, request, null, metaCreator)
}
```

`createRestRequestAction` is directly tied to the REST API and should be used by modules that are resources.

### Creating REST request actions

As mentioned in the previous section; the `createRestRequestAction` function creates a specific request adhering to the REST api rules of the application.
It takes the following args: 
```javascript 
moduleId, restAction = restActionTypes.LOAD, request, isCacheable = false, selector = null
```
- moduleId: The name of the resource associated with the API. As an example: "users", "clients", "comments" etc.
- restAction: A string denoting the type of rest operation ("create", "edit", "load", "delete", etc.). Valid types are defined in the `restActionTypes` object.
- request: The request/API call function returning a promise.
- isCacheable: If the action handles a resource response that should be cached/checked for previous cache.
- selector: The cache-selector, as explained in section "Creating requests for the system".

The importance of naming conventions and proper setup is further explained in a previous section.

## Cache

The cache-system is tied to the request workflow. Most work is done with Redux-Persist and in utils/redux/requests/subsriber, but how the actions for any module is created is important for it to work with the cache.

### How to mark a request/action as cachable

The entity in the redux state should have some form of control-variable to mark the cache
dirty or not. A custom selector for this state should be passed to `createRequestActionForCacheable`
as the third argument.
Behind the scenes, this function will pass some meta-data to the request-creator, marking it to check the cache, and uses the selector against the current state to figure out if it is dirty or not.

Example code to implement cache-checks from a request:

```javascript
import { createRequestActionForCacheable } from 'utils/redux/utils/createRequestAction'

const usersCacheSelector = state => state.entities.users.cache.isDirty

// A function returning a promise, i.e: axios or fetch api
const loadUsersFromApi = () => { return apiGet('users') }
// Action creator
export const loadUsersAction = createRequestActionForCacheable(
    actionTypes.USERS_LOAD,
    loadUsersFromApi,
    usersCacheSelector)
```

### Cache expiration

The expiration of the cache is handled by transforming the Redux-Persist cache with utils/persistex. When the key for the cache has expired, the isDirty property is set to true to allow any next request for that resource to fetch as normal.

- Redux-Persist handles the actual caching to some storage
- Persistex (redux-persist transformer) auto-marks a cache as dirty if an expire key is present
- Subsequent request to the resource is not dispatched to the API as long as the cache is clean

This three-part system makes sure no requests to the server are sent unnecessarily, and that the cache can be easily updated/purged.

## Data normalization

To normalize data, we must intercept the request for the resource loading. This is currently done by using a saga to `take` the request, and dispatching a custom request outside of the general request-workflow described above.

Example setup of a saga, taking the request of the example above (users request):

```javascript
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import types from './actionTypes'
import { usersNormalizer } from './schema'

export function* watchUsersLoad() {
    yield takeLatest(types.USERS_LOAD, handleUsersLoad)
}

function* handleUsersLoad(action){
    try {
        const normalizedData = yield call(usersNormalizer, action.paylad.data)
        yield put({ types.USERS_LOAD_NORMALIZED, payload: normalizedData })
    } catch(e){
        // data was not normalized
    }
}
```

Instead of handling the `USERS_LOAD` in the reducer, instead handle the `USERS_LOAD_NORMALIZED` to store the relevant data in the state. This is also a good place to update/set cache expiration for the data.

### Updating normalized data, and how it affects the cache

Insert new data to state and the redux-persist will handle the change as normal

### Removing normalized data, and how it affects the cache

Must re-fetch the entity cache entirely.

# Signex app milestones

- [ ] Implement pusher-js to broadcast data-/cache changes across clients
- [ ] Automate, with higher-order functionality, the cache selectors and actions for all modules fitting the pattern
- [ ] Move cache utility and other setup functionality to its own module directory