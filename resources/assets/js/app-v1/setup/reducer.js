import { combineReducers } from 'redux'

//import answersReducer from '../utils/redux/answers/reducer'
import requestsReducer from '../utils/redux/requests/reducer'
import authReducers from '../auth/reducer'

export default combineReducers({
    //answers: answersReducer,
    requests: requestsReducer,
    auth: authReducers.authReducer
})