# SignEx App js framework

The minimum required modules for this app to work are:

- auth : Handles all authentication routines and supplies helpers and components
- common : Defines components used in general to form the web-design. Provides layout components for any other module to use.
- setup : Initial setup of Redux, cache, routes and store related functionality
- utils : Several utilities required of the app, most importantly the cache and api-request baseline

Everything is tied together in ./index.js.

## Requests and the API

The API request system is a modified version of this: https://github.com/andrewtpoe/request-answers
See the docs for it to get a base understanding of the general system.

### Creating request for the system

A request is made for this system by using the createRequestAction helper in Utils/redux/utils.
Every request-action made with this function will dispatch (along with a couple of cleanup actions):

- `QUEUE_REQUEST -> ADD_PENDING_REQUEST -> MY_ACTION -> FINALIZE_REQUEST`

or

- `QUEUE_REQUEST -> ADD_PENDING_REQUEST -> ADD_FAILED_REQUEST -> FINALIZE_REQUEST`

The original action (i.e: `MY_ACTION`) is always stored as a meta-property of the QUEUE/PENDING/FAILED/FINALIZED actions.
The `MY_ACTION` will only be executed if the response/request was successful - so the reducer should check for that action to respond to success.

## Cache

The cache-system is tied to the request workflow. Most work is done with Redux-Persist and in utils/redux/requests/subsriber, but how the actions for any module is created is important for it
to work with the cache.

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