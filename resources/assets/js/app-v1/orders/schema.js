import {schema, normalize} from 'normalizr'

/** Schema for orders table */
/*
export const orderSchema = new schema.Entity('orders')
export const orderListSchema = { orders: [orderSchema]}
*/
export const orderSchema = new schema.Entity('orders')
export const orderListSchema = new schema.Array(orderSchema)

/** Normalizer for orders table */
export const ordersNormalizer = (data) => {
    const normalizedData = normalize(data.orders, orderListSchema)

    return {
        byId: normalizedData.entities.orders,
        allIds: normalizedData.result
    }
}

export const singleOrderNormalizer = (order) => {
    const normalizedData = normalize(order, orderSchema)
    console.log("NORMALIZED order DATA")
    console.log(normalizedData)
    return {
        byId: normalizedData.entities.orders,
        allIds: [normalizedData.result]
    }
}
