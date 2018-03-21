import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {orderSchema, orderListSchema} from '../schema'

import actionTypes from '../actionTypes'
import { createHasActiveRequestSelectorFor, createFailedRequestSelectorFor } from 'AppUtils/redux/requests/selectors'

/** A selector to check if this modules' cache is dirty or not */
export const isCacheDirtySelector = x => true // state => state.entities.orders.cache.isDirty

/** Check if there is an active request for orders loading  */
export const isLoadingOrders = createHasActiveRequestSelectorFor('ORDERS_LOAD')

/** Get all order entities as stored in the state (normalized) */
const getOrdersNormalized = state => state.entities.orders.byId

/** Get entity-id's only, for the order entities */
const getAllOrderIds = state => state.entities.orders.allIds

/** Get ID of selected order in UI */
export const getSelectedOrderId = state => state.ui.orders.selectedOrderId

/** Get the selected order entity based on selected order ID */
/*
export const getSelectedOrderUI = createSelector(
    [getSelectedOrderId, getOrdersNormalized],
    (orderId, orders) => {
        return orderId ? orders[orderId] : null
    }
)*/

/** Compose an object that contains all entities required to denormalize orders @todo: This sucks.. */
const getOrdersWithAll = state => ({ 
    orders: state.entities.orders.byId, 
    clients: state.entities.clients.byId,
    users: state.entities.users.byId
})

/** Denormalize and return all order entities. */
export const getDenormalizedOrders = createSelector(
    [ getAllOrderIds, getOrdersWithAll],
    (orderIds, orders) => {
        const denormalized = denormalize(orderIds, orderListSchema, orders)
        console.debug(`${denormalized.length} orders denormalized.`)

        return denormalized
    }
)

/** Get the selected order entity based on selected order ID, DENORMALIZED */
export const getSelectedOrderUI = createSelector(
    [ getSelectedOrderId, getOrdersWithAll],
    (orderIds, orders) => {
        const denormalized = denormalize([orderIds], orderListSchema, orders)
        console.debug(`${denormalized.length} orders denormalized.`)

        return denormalized[0]
    }
)
