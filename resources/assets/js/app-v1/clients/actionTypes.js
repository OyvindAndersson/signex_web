/**
 * This file defines actionTypes that are not
 * default to the REST api types, such as
 * LOAD, CREATE, EDIT, DELETE etc.
 * They are defined in utils/redux.
 */
import { MODULE_ID } from './constants'

// ui
const CLIENTS_UI_SELECTED_MASTER_ID = `${MODULE_ID}_UI_SELECTED_MASTER_ID`

// Export all as single object
export default {
    CLIENTS_UI_SELECTED_MASTER_ID,
};