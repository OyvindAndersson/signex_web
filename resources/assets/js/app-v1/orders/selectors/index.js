import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {orderSchema, orderListSchema} from '../schema'

import actionTypes from '../actionTypes'
import { createHasActiveRequestSelectorFor, createFailedRequestSelectorFor } from 'AppUtils/redux/requests/selectors'

/** A selector to check if this modules' cache is dirty or not */
export const isCacheDirtySelector = state => state.entities.orders.cache.isDirty
/**  */
export const isLoadingOrders = createHasActiveRequestSelectorFor(actionTypes.CLIENTS_LOAD)


export const getSelectedOrderId = state => state.ui.orders.selectedOrderId
const getOrders = state => state.entities.orders.byId

export const getSelectedOrderUI = createSelector(
    [getSelectedOrderId, getOrders],
    (orderId, orders) => {
        if(!orderId || orderId == 0){
            return null
        }

        return orders[orderId]
    }
)

const getAllOrderIds = state => state.entities.orders.allIds

export const getDenormalizedOrders = createSelector(
    [getAllOrderIds, getOrders],
    (orderIds, orders) => {
        return denormalize(orderIds, orderListSchema, {orders})
    }
)