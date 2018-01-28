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


console.debug(`== SignEx ${window.SIGNEX.versionString()} ==`)
require('./app-v1')
