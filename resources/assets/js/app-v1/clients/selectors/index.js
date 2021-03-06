import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {clientSchema, clientListSchema} from '../schema'

import actionTypes from 'Clients/actionTypes'
import { createHasActiveRequestSelectorFor, createFailedRequestSelectorFor } from 'AppUtils/redux/requests/selectors'

/** A selector to check if this modules' cache is dirty or not */
export const isCacheDirtySelector = state => state.entities.clients.cache.isDirty

/** Selector to check if a client-create action is active */
export const isCreateClientActive = createHasActiveRequestSelectorFor(actionTypes.CLIENTS_CREATE)
/** Selector to check if last client-create action failed */
export const didCreateClientFail = createFailedRequestSelectorFor(actionTypes.CLIENTS_CREATE)
/** Selector to check if the client entities are loading */
export const isLoadingClients = createHasActiveRequestSelectorFor(actionTypes.CLIENTS_LOAD)

export const createdClientSuccess = state => state.ui.clients.clientCreatedSuccess

const getClients = state => state.entities.clients.byId
const getAllClientIds = state => state.entities.clients.allIds
const getSelectedClientId = state => state.ui.clients.selectedClientId

export const getSelectedClientUI = createSelector(
    [getSelectedClientId, getClients],
    (clientId, clients) => {
        if(!clientId || clientId == 0){
            return null
        }

        return clients[clientId]
    }
)
export const getDenormalizedClients = createSelector(
    [getAllClientIds, getClients],
    (clientIds, clients) => {
        return denormalize(clientIds, clientListSchema, {clients})
    }
)