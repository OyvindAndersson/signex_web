console.log("Laravel App v1")

export const signex = {
    humanDateFormat: 'DD.MM.Y H:mm',
    dev: {
        logDispatch: false
    },
    version: {
        major: 0,
        minor: 1,
        patch: 1,
        meta: 'pre-alpha'
    }
}
/**
 * SIGNEX APP global
 */
window.SIGNEX = signex

/**
 * Utility to get Apps' version string
 */
window.SIGNEX.versionString = () => {
    const {major, minor, patch, meta} = SIGNEX.version
    return `v${major}.${minor}.${patch}-${meta}` 
}

require('./app-v1')
