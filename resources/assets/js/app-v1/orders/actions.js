import actionTypes from './actionTypes'
import clientsApi from './api'
import {apiRequest, apiPostRequest} from '../common/api'
import {clientsNormalizer, singleClientNormalizer} from './schema'


/** Fetches all clients from the API */
export function clientsFetchAll() { return apiRequest('clients', actionTypes.CLIENTS_FETCH_ALL, null, clientsNormalizer) }

/** Creates a new client and persists in database */
export function clientsCreate(newClient) { return apiPostRequest('clients/create', actionTypes.CLIENTS_CREATE, newClient, singleClientNormalizer) }
