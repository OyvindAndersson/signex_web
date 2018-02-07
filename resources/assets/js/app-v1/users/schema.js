import {schema, normalize} from 'normalizr'

/** Schema for users table */
export const userSchema = new schema.Entity('users')
export const userListSchema = new schema.Array(userSchema)

/** Normalizer for user entities */
export const usersNormalizer = (data) => {
    const normalizedData = normalize(data.users, userListSchema)

    return {
        byId: normalizedData.entities.users,
        allIds: normalizedData.result
    }
}

export const singleUserNormalizer = (user) => {
    const normalizedData = normalize(user, userSchema)
    console.log('%c Normalized single user', 'color: blue')
    console.log(normalizedData)
    return {
        byId: normalizedData.entities.users,
        allIds: [normalizedData.result]
    }
}
