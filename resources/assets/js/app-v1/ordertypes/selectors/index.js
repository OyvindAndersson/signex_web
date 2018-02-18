import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {entitySchema, entityCollectionSchema} from '../schema'

import actionTypes from '../actionTypes'

/** A selector to check if this modules' cache is dirty or not */
export const isCacheDirtySelector = state => state.entities.ordertypes/selectors.cache.isDirty

const getOrdertypes/selectors = state => state.entities.ordertypes/selectors.byId
const getAllOrdertypes/selectorsIds = state => state.entities.ordertypes/selectors.allIds

export const getDenormalizedOrdertypes/selectors = createSelector(
    [getAllOrdertypes/selectorsIds, getOrdertypes/selectors],
    (ordertypes/selectorsIds, ordertypes/selectors) => {
        return denormalize(ordertypes/selectorsIds, entityCollectionSchema, {ordertypes/selectors})
    }
)