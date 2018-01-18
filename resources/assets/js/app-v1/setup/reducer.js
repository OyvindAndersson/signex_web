import { combineReducers } from 'redux'

//import answersReducer from '../utils/redux/answers/reducer'
import requestsReducer from '../utils/redux/requests/reducer'
import authReducer from '../auth/reducer'

export default combineReducers({
    requests: requestsReducer,
    auth: authReducer
})