import {schema, normalize} from 'normalizr'

/** Schema for ordertypes table */
export const ordertypeSchema = new schema.Entity('ordertypes')
export const ordertypesListSchema = new schema.Array(ordertypeSchema)

/** Normalizer for ordertype entities */
export const ordertypesNormalizer = (data) => {
    const normalizedData = normalize(data.ordertypes, ordertypesListSchema)

    return {
        byId: normalizedData.entities.ordertypes,
        allIds: normalizedData.result
    }
}

export const singleOrdertypeNormalizer = (user) => {
    const normalizedData = normalize(user, ordertypeSchema)
    console.log('%c Normalized single ordertype', 'color: blue')
    console.log(normalizedData)
    return {
        byId: normalizedData.entities.ordertypes,
        allIds: [normalizedData.result]
    }
}
