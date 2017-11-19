import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import constants from '../constants'

/*
const AuthRoute = ({ component: Component, ...rest }) => (  
    <Route {...rest} render={props => (
      localStorage.getItem('token') ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: constants.LOGIN_PATH,
          state: { from: props.location }
        }}/>
      )
    )}/>
  ) */

  /**
   * Auth Route Wrapper
   * 
   * Wraps a react-router Route. Yields access based upon
   * authenticated status and role, if defined
   * 
   * @todo implement role checks
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
      if(localStorage.getItem('token')){
        this.setState({isGuest: false})
      }
    }

    componentWillReceiveProps(nextProps){
      //console.log(nextProps)

      const {token} = nextProps
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
  