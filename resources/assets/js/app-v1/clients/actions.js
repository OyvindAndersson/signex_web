import actionTypes from './actionTypes'
import clientsApi from './api'
import {apiRequest} from '../common/api'
import {normalize, schema} from 'normalizr'

/** Schema for clients table */
const clientSchema = new schema.Entity('clients')
const clientsList = { clients: [clientSchema]}

/** Normalizer for clients table */
const clientsNormalizer = (data) => {
    const normalizedData = normalize(data, clientsList)
    return {
        byId: normalizedData.entities.clients,
        allIds: normalizedData.result.clients
    }
}

/** Fetches all clients from the API */
export function clientsFetchAll() { return apiRequest('clients', actionTypes.CLIENTS_FETCH_ALL, clientsNormalizer) }
