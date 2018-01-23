import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {clientSchema, clientListSchema} from '../schema'

import actionTypes from 'Clients/actionTypes'
import { createHasActiveRequestSelectorFor, createFailedRequestSelectorFor } from 'AppUtils/redux/requests/selectors'

/** Selector to check if a client-create action is active */
export const isCreateClientActive = createHasActiveRequestSelectorFor(actionTypes.CLIENTS_CREATE)
/** Selector to check if last client-create action failed */
export const didCreateClientFail = createFailedRequestSelectorFor(actionTypes.CLIENTS_CREATE)


const getSelectedClientId = state => state.ui.clients.selectedClientId
const getClients = state => state.entities.clients.byId

export const getSelectedClientUI = createSelector(
    [getSelectedClientId, getClients],
    (clientId, clients) => {
        if(!clientId || clientId == 0){
            return null
        }

        return clients[clientId]
    }
)

const getAllClientIds = state => state.entities.clients.allIds

export const getDenormalizedClients = createSelector(
    [getAllClientIds, getClients],
    (clientIds, clients) => {
        return denormalize(clientIds, clientListSchema, {clients})
    }
)