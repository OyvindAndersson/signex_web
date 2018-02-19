import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'
import {ordertypeSchema, ordertypesListSchema} from '../schema'

import actionTypes from '../actionTypes'

/** A selector to check if this modules' cache is dirty or not */
export const isCacheDirtySelector = state => state.entities.ordertypes.cache.isDirty

const getOrdertypes = state => state.entities.ordertypes.byId
const getAllOrdertypeIds = state => state.entities.ordertypes.allIds

export const getDenormalizedOrdertypes = createSelector(
    [getAllOrdertypeIds, getOrdertypes],
    (ordertypeIds, ordertypes) => {
        return denormalize(ordertypeIds, ordertypesListSchema, {ordertypes})
    }
)