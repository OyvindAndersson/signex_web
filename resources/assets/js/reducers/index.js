import { combineReducers } from 'redux'

const initialState = {}

/* General app state */
function appReducer(state = initialState, action){
    return state;
}

// Combine all reducers to complete the state shape
const rootReducer = combineReducers({
    appReducer
});

export default rootReducer;