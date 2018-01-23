import { createRequestAction } from "../utils/redux/utils/createRequestAction"

import actionTypes from './actionTypes'
import {clientsNormalizer, singleClientNormalizer} from './schema'


export function clientsFetchAll() { 
    return apiRequest('clients', actionTypes.CLIENTS_FETCH_ALL, null, clientsNormalizer) 
}

export function clientsCreate(newClient) { 
    return apiPostRequest('clients/create', actionTypes.CLIENTS_CREATE, newClient, singleClientNormalizer) 
}

import types from './actionTypes'
import { apiPost, apiGet } from '../api'


/**
 * Fetch all Clients action
 */
const loadClients = () => { return apiGet('clients') }
export const loadClientsAction = createRequestAction(types.CLIENTS_LOAD, loadClients)

/**
 * Update selected client action (UI)
 * Used primarily in master/detail view. Master list item id
 */
export const updateClientsMasterListItemIdAction = (clientId) => ({
    type: types.CLIENTS_UI_SELECTED_MASTER_ID, 
    payload: clientId
})