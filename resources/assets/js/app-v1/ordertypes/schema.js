import {schema, normalize} from 'normalizr'

/** Schema for ordertypes table */
export const entitySchema = new schema.Entity('ordertypes')
export const entityCollectionSchema = new schema.Array(entitySchema)

/** Normalizer for ordertypes entities */
export const collectionNormalizer = (data) => {
    const normalizedData = normalize(data.ordertypes, entityCollectionSchema)

    return {
        byId: normalizedData.entities.ordertypes,
        allIds: normalizedData.result
    }
}

export const singleNormalizer = (entity) => {
    const normalizedData = normalize(entity, entitySchema)
    console.log('%c Normalized single ordertypes entity', 'color: blue')
    console.log(normalizedData)
    return {
        byId: normalizedData.entities.ordertypes,
        allIds: [normalizedData.result]
    }
}
