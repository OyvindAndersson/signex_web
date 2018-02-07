import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {userSchema, userListSchema} from '../schema'

import actionTypes from '../actionTypes'

/** A selector to check if this modules' cache is dirty or not */
export const isCacheDirtySelector = state => state.entities.users.cache.isDirty

const getUsers = state => state.entities.users.byId
const getAllUserIds = state => state.entities.users.allIds

export const getDenormalizedUsers = createSelector(
    [getAllUserIds, getUsers],
    (userIds, users) => {
        return denormalize(userIds, userListSchema, {users})
    }
)