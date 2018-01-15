

## Folder structure
- js
    - bootstrap.js              // Bootstrap app; requires/plugins etc.
    - index.js                  // App wrapper, root component, store provider, app-routes - initialize!
    - routes.js                 // All routes associated with the app (general routes; not subroutes)
    - common/       
        - components/
        - api.js                // Common api routines
        - constants.js          // Common constants
        - index.js              // Expose common module
    - utils/
    - App/
        - MODULE_NAME
            - api.js            // API calls
            - constants.js
            - routes.js         // Routes specific to the module
            - actions.js
            - actionTypes.js
            - reducer.js
            - schema.js
            - selectors/
                - index.js
            - componenets/
                - view/
                - control/