console.log("Laravel App v1")

var config = require('./app-v1/config')

/**
 * SIGNEX APP global
 */
window.SIGNEX = config

/**
 * Utility to get Apps' version string
 */
window.SIGNEX.versionString = () => {
    const {major, minor, patch, meta} = SIGNEX.version
    return `v${major}.${minor}.${patch}-${meta}` 
}

require('./app-v1')
