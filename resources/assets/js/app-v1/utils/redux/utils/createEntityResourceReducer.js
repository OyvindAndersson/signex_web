import moment from 'moment'

function addAllNormalizedEntities(state, action){
    const { byId } = action.payload || null
    if(byId){
        return {
            ...state,
            ...byId
        }
    } else {
        return state
    }
}

function addSingleNormalizedEntity(state, action){
    const { byId, allIds } = action.payload
    // control validity
    if(!byId || !allIds){
        return state
    }

    return { 
        ...state, 
        [allIds]: byId[allIds] 
    }
}

export function createForNormalizedEntities(moduleName = ''){
    return function modEntityReducer(state = {}, action){
        switch(action.type){
            case `${moduleName}_LOAD_NORMALIZED`: return addAllNormalizedEntities(state, action)
            case `${moduleName}_CREATE_NORMALIZED`: return addSingleNormalizedEntity(state, action)
            default: return state
        }
    }
}

function addEntityIds(state, action){
    const { allIds } = action.payload

    if( allIds ){
        return _.union(state, allIds)
    } else {
        return state
    }
}

export function createForNormalizedEntityIds(moduleName = ''){
    return function modEntityIdsReducer(state = [], action){
        switch(action.type){
            case `${moduleName}_LOAD_NORMALIZED`:
            case `${moduleName}_CREATE_NORMALIZED`: return addEntityIds(state, action)
            default: return state
        }
    }
}

function handleCache(state, expirationTime){
    return { 
        ...state,
        isDirty: false, 
        expiresAt: expirationTime || moment().add(1, 'm') 
    }
}

export function createForModuleCache(moduleName = '', expirationTime = null ){
    return function modCacheReducer(state = { isDirty: true }, action){
        switch(action.type){
            case `${moduleName}_LOAD_NORMALIZED`: return handleCache(state, expirationTime)
            //case `${moduleName}_CREATE`:: return { isDirty: true }
            default: return state
        }
    }
}