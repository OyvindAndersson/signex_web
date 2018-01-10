import {schema, normalize} from 'normalizr'

import { clientSchema } from '../clients/schema'
import { userSchema } from '../auth/schema'

/** Schema for orders table */
export const orderSchema = new schema.Entity('orders')
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
        allIds: normalizedData.result,
        notify
    }
}

export const singleOrderNormalizer = (data) => {
    const { notify, ...rest} = data
    const normalizedData = normalize(rest, orderSchema)
    return {
        byId: normalizedData.entities.orders,
        allIds: [normalizedData.result],
        notify
    }
}
