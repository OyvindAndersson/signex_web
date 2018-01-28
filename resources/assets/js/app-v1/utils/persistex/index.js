import { createTransform } from 'redux-persist'
import moment from 'moment'
import { hasIn, get, set, take, split, compact } from 'lodash'
import { isArray } from 'util'

/**
 * 
 * @param {object} config - The transformer configuration 
 * @param {array|string} config.expireKey - The property name of the expiration key, 
 * with optional number of sub-levels. 
 * I.e: 'myObj.another.myExpireKey' or ['myObj', 'another', 'myExpireKey]
 * 
 * @param {object} config.defaultState - The default state to set on the same
 * object as referenced by 'config.expireKey'; if the date has expired. 
 * I.e: a new expiration date
 */
const createPersistExTransform = (config) => {
    config = config || {}
    config.defaultState = config.defaultState || { isDirty: true, expiresAt: '' }
    config.expireKeySelector = config.expireKeySelector || ['cache', 'expiresAt']
    
    if(!isArray(config.expireKeySelector)){
        config.expireKeySelector = split(config.expireKeySelector, '.')
    }

    const inbound = (state, key) => {
        return state
    }
    
    const outbound = (state, key) => {
        let newState = state
        
        for(let property in state){
            // Check if any first-level property of state has the property-path to the expireKeySelector we're looking for
            if( hasIn(state, [property].concat(config.expireKeySelector))){

                // Extract the expiration property value
                const expires = get(state, [property].concat(config.expireKeySelector))

                // Is 'now' after the expiration date?
                if( moment().isAfter(expires) ) {
                    console.debug(`%cPersistex: The [${property}] cache has expired!`, 'color: #FF99AA')

                    const paths = [property].concat(config.expireKeySelector)
                    // get the second-last property name so we can set the object that the expireKey variable belongs to
                    set(newState, take(paths, paths.length - 1), config.defaultState)
                }
            }
        }

        return newState
    }

    return createTransform(inbound, outbound)
}

export default createPersistExTransform