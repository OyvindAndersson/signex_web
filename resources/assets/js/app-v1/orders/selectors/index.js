import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {orderSchema, orderListSchema} from '../schema'

const getSelectedOrderId = state => state.ui.orderPage.selectedOrderId
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