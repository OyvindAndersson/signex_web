
## Required modules
For this app to work, the following modules are required/dependent on eachother:
- auth : Handles all authentication routines and supplies helpers and components
- common : Defines components used in general to form the web-design. Provides layout components for any other module to use.
- setup : Initial setup of Redux, cache, routes and store related functionality
- utils : Any utility required of the app, most importantly the cache and api-request baseline

Everything is tied together in ./index.js.

## Cache

The cache is setup

