
# Required modules

For this app to work, the following modules are required/dependent on eachother:

- auth : Handles all authentication routines and supplies helpers and components
- common : Defines components used in general to form the web-design. Provides layout components for any other module to use.
- setup : Initial setup of Redux, cache, routes and store related functionality
- utils : Any utility required of the app, most importantly the cache and api-request baseline

Everything is tied together in ./index.js.

## Requests and the API

The API request system is a modified version of this: https://github.com/andrewtpoe/request-answers
See the docs for it to get a base understanding of the general system.

### Creating request for the system

A request is made for this system by using the createRequestAction helper in Utils/redux/utils.
Every request-action made with this function will dispatch (along with a couple of cleanup actions):

- QUEUE_REQUEST -> ADD_PENDING_REQUEST -> MY_ACTION -> FINALIZE_REQUEST
- QUEUE_REQUEST -> ADD_PENDING_REQUEST -> ADD_FAILED_REQUEST -> FINALIZE_REQUEST

The original action (i.e: MY_ACTION) is always stored as a meta-property of the QUEUE/PENDING/FAILED/FINALIZED actions.
The MY_ACTION will only be executed if the response/request was successful - so the reducer should check for that action to respond to success.

## Cache

The cache is tied to the request => API workflow. Most work is done with Redux-Persist and in utils/redux/requests/subsriber.
Whenever a request is queued and the requestType ends with '_LOAD' (i.e: USERS_LOAD), the store-state is checked to see if a module named 'users' (the string before '_LOAD') has a clean cache of the entities.
The setup for this app requires the path of the state to be:

[store.state] => 'entities' => 'MODULENAME' => cache => isDirty : true|false

If isDirty is set to true, the request will go through its normal lifecycle. If not, the request is not added to pending, but aborted immediatly by issuing a clear queued request for that request.

The expiration of the cache is handled by transforming the Redux-Persist cache (utils/persistex). When the key for the cache has expired, the isDirty property is set to true to allow any next request for that resource to fetch as normal.

- Redux-Persist effectively caches the 'entities' state section
- Persistex (redux-persist transformer) auto-marks a cache as dirty if expired
- Subsequent request to the resource is not dispatched to the API as long as the cache is clean

This three-part system makes sure no requests to the server are sent unnecessarily.

### Cache milestones

- [ ] Less restrictive / hardcoded check for module request types
- [ ] Let modules define selector for cache checks (isdirty)
- [ ] Make cache functionality pluggable