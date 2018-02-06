/**
 * This file should define all action types
 * related to this module
 */
import { MODULE_ID } from './constants'
import * as appTypes from '../constants'

const CLIENTS_LOAD = `${MODULE_ID}${appTypes.LOAD}`
const CLIENTS_LOAD_NORMALIZED = `${MODULE_ID}${appTypes.LOAD_NORMALIZED}`
const CLIENTS_CREATE = `${MODULE_ID}${appTypes.CREATE}`
const CLIENTS_CREATE_NORMALIZED = `${MODULE_ID}${appTypes.CREATE_NORMALIZED}`

// ui
const CLIENTS_UI_SELECTED_MASTER_ID = `${MODULE_ID}_UI_SELECTED_MASTER_ID`


// Export all as single object
export default {
    CLIENTS_LOAD,
    CLIENTS_LOAD_NORMALIZED,
    CLIENTS_CREATE,
    CLIENTS_CREATE_NORMALIZED,

    CLIENTS_UI_SELECTED_MASTER_ID,
};