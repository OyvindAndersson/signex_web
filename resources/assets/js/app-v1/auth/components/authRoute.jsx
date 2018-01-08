import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import constants from '../constants'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

import { authUserToken } from '../actions'
import types from '../actionTypes'

  /**
   * Auth Route Wrapper
   * 
   * Wraps a react-router Route. Yields access based upon
   * authenticated status and role, if defined
   * 
   * @todo implement role checks
   * @todo validate token on every update (receive props) properly (against server?)
   */
class AuthRoute extends React.Component {
    constructor(props){
      super(props)

      this.renderAuth = this.renderAuth.bind(this)
      this.renderGuest = this.renderGuest.bind(this)
      this.simpleValidate = this.simpleValidate.bind(this)

      this.state = {
        isGuest: true
      }
    }

    componentWillMount(){
      console.log("AuthRoute - Component will mount")
      this.simpleValidate()
    }

    componentWillReceiveProps(nextProps){
      console.log("AuthRoute - Component will update")
      this.simpleValidate()
    }

    /**
     * Simple client-side validation. This is NOT a secure check;
     * only for UI responsiveness. The server API handles the
     * rejection and will not deliver data without a valid
     * token either way.
     * @param {jwt token} token 
     */
    simpleValidate(token = localStorage.getItem('token')){
      const {dispatch} = this.props

      if(token){
        try {
          const decodedToken = jwtDecode(token)
          const dateNow = moment().unix()

          if(decodedToken.exp < dateNow){
            console.log("AuthRoute Update: Token expired. Is now Guest.")
            this.setState({ isGuest: true })

            dispatch({type: types.AUTH_LOGOUT_USER })
            return
          }

          console.log("AuthRoute Update: is authenticated")
          this.setState({ isGuest: false })
        } catch(e){
          
          console.error(e)
          console.log("AuthRoute Update: is guest. (See error above)")
          this.setState({ isGuest: true })
        }

      } else {
        console.log("AuthRoute Update: is guest.")
        this.setState({ isGuest: true })
      }
    }

    renderGuest(){
      const {component, ...rest} = this.props
      return (
        <Route {...rest} render={props => (
            <Redirect to={{
              pathname: constants.LOGIN_PATH,
              state: { from: props.location }
            }}/>
        )}/>
      )
    }

    renderAuth(){
      const {component, ...rest} = this.props
      const Component = component

      return(
        <Route {...rest} render={props => (
          <Component {...props} />
      )}/>
      )
    }

    render() {
      //alert(this.state.isGuest)
      return this.state.isGuest ? this.renderGuest() : this.renderAuth()
    }
  }
  
  /** AuthRoute connected */
  export default connect((state) => ({}))(AuthRoute)