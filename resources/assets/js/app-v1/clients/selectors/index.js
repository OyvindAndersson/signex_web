import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {clientSchema, clientListSchema} from '../schema'

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