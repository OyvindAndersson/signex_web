import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import constants from '../constants'

  /**
   * Auth Route Wrapper
   * 
   * Wraps a react-router Route. Yields access based upon
   * authenticated status and role, if defined
   * 
   * @todo implement role checks
   * @todo validate token on every update (receive props) properly (against server?)
   */
  class AuthRouteWrapper extends React.Component {
    constructor(props){
      super(props)

      this.renderAuth = this.renderAuth.bind(this)
      this.renderGuest = this.renderGuest.bind(this)

      this.state = {
        isGuest: true
      }
    }

    componentWillMount(){
      console.log("AuthRoute - Component will mount")

      const localToken = localStorage.getItem('token')

      if(localToken && jwtDecode(localToken)){
        this.setState({isGuest: false}, () => { console.log("AuthRoute: IS AUTHED")})
      } else {
        this.setState({isGuest: true}, () => { console.log("AuthRoute: IS GUEST")})
      }
    }

    componentWillReceiveProps(nextProps){
      const { token } = nextProps

      if(localStorage.getItem('token') && token){
        console.log("AuthRoute Update: is authenticated with token")
        this.setState({ isGuest: false })
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

  export const AuthRoute = connect( state => ({
    token: state.auth.token
  }))(AuthRouteWrapper)
  