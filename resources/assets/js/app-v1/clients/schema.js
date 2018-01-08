import {schema, normalize} from 'normalizr'

/** Schema for clients table */
/*
export const clientSchema = new schema.Entity('clients')
export const clientListSchema = { clients: [clientSchema]}
*/
export const clientSchema = new schema.Entity('clients')
export const clientListSchema = new schema.Array(clientSchema)

/** Normalizer for clients table */
export const clientsNormalizer = (data) => {
    const normalizedData = normalize(data.clients, clientListSchema)

    return {
        byId: normalizedData.entities.clients,
        allIds: normalizedData.result
    }
}

export const singleClientNormalizer = (client) => {
    const normalizedData = normalize(client, clientSchema)
    return {
        byId: normalizedData.entities.clients,
        allIds: [normalizedData.result]
    }
}
