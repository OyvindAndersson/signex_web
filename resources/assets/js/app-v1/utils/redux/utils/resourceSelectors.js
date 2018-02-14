import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {userSchema, userListSchema} from '../schema'

import actionTypes from '../actionTypes'

/** A selector to check if this modules' cache is dirty or not */
export const isCacheDirtySelector = state => state.entities.users.cache.isDirty


export const createDenormalizeSelectorForModule = (moduleId, collectionSchema) => {
	const getEntities = state => state.entities[moduleId].byId
	const getEntityIds = state => state.entities[moduleId].allIds
	
	return createSelector(
		[getEntityIds, getEntities],
		(entityIds, entities) => {
			return denormalize(entityIds, collectionSchema, {entities})
		}
	)
}

const getUsers = state => state.entities.users.byId
const getAllUserIds = state => state.entities.users.allIds

export const getDenormalizedUsers = createSelector(
    [getAllUserIds, getUsers],
    (userIds, users) => {
        return denormalize(userIds, userListSchema, {users})
    }
)