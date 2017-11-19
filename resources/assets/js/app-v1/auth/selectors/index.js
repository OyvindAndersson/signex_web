import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {userSchema, userListSchema} from '../schema'

const getUsers = state => state.entities.users.byId

const getAllUserIds = state => state.entities.users.allIds

export const getDenormalizedUsers = createSelector(
    [getAllUserIds, getUsers],
    (userIds, users) => {
        return denormalize(userIds, userListSchema, {users})
    }
)
