import {schema, normalize} from 'normalizr'


/** Schema for users table */
export const userSchema = new schema.Entity('users')
export const userListSchema = new schema.Array(userSchema)


/** Normalizer for users table */
/*
export const usersNormalizer = (data) => {
    const normalizedData = normalize(data.users, userListSchema)
    if(data.users.length === 0){
        return {
            byId: {},
            allIds: []
        }
    }
    return {
        byId: normalizedData.entities.users,
        allIds: normalizedData.result
    }
}

export const singleUserNormalizer = (user) => {
    const normalizedData = normalize(user, userSchema)
    console.log("NORMALIZED user DATA")
    console.log(normalizedData)
    return {
        byId: normalizedData.entities.users,
        allIds: [normalizedData.result]
    }
}
*/