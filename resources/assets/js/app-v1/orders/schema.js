import {schema, normalize} from 'normalizr'

import { clientSchema } from '../clients/schema'
import { userSchema } from '../auth/schema'

/** Schema for orders table */
export const orderSchema = new schema.Entity('orders', {
    'client_id': clientSchema,
    'user_id': userSchema
})
export const orderListSchema = new schema.Array(orderSchema)

/** Normalizer for orders table */
export const ordersNormalizer = (data) => {
    const {orders, notify} = data

    const normalizedData = normalize(orders, orderListSchema)
    if(orders.length === 0){
        return {
            byId: {},
            allIds: []
        }
    }
    return {
        byId: normalizedData.entities.orders,
        allIds: normalizedData.result
    }
}

export const singleOrderNormalizer = (data) => {
    const {order} = data
    if(!order){
        console.debug("Failed to normalize single order.", order || '')
        return {
            byId: {},
            allIds: []
        }
    }
    const normalizedData = normalize(order, orderSchema)
    return {
        byId: normalizedData.entities.orders,
        allIds: [normalizedData.result]
    }
}