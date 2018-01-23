import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import constants from 'Auth/constants'
import types from 'Auth/actionTypes'
import { logoutAction } from 'Auth/actions'
import { isVerifyTokenActive, verifyTokenError, isClientAuthenticated } from 'Auth/selectors'
import { onlyAuth } from './authHocs'

  /**
   * Auth Route Wrapper
   * 
   * Wraps a react-router Route. Yields access based upon
   * authenticated status and role, if defined
   * 
   */
class AuthRoute2 extends React.Component {
  constructor(props){
    super(props)

    this.renderAuth = this.renderAuth.bind(this)
    this.renderGuest = this.renderGuest.bind(this)

    this.state = {
      isAuthenticated: props.isAuthenticated ? props.isAuthenticated : false,
      hasLoadedStore: false
    }
  }

  componentWillReceiveProps(nextProps){
    //console.log("AuthRoute - Component will update")
    this.setState({
      isAuthenticated: nextProps.isAuthenticated,
      hasLoadedStore: true
    })
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
    const {isAuthenticated} = this.props
    if(!this.state.hasLoadedStore && !isAuthenticated){
      return null
    }
    console.log("authRoute - isAuthenticated", `[${this.state.isAuthenticated}]`)

    return this.state.isAuthenticated ? this.renderAuth() : this.renderGuest()
  }
}

/**
 * AuthRoute
 * 
 * Wraps a react-router Route, and should be rendered
 * when - and only when - authenticated
 * 
 * @todo User role check
 */
class AuthRoute extends React.Component {
  constructor(props){
    super(props)

    var isAuthed = props.isAuthenticated || localStorage.getItem('isAuthenticated') == 'true'
    this.state = {
      isAuthenticated: isAuthed
    }
  }

  componentWillReceiveProps(nextProps){
    //console.log("AuthRoute - Component will update")
    this.setState({
      isAuthenticated: nextProps.isAuthenticated
    })
  }

  render(){
    const {component, ...rest} = this.props
    const Component = component

    return(
      <Route {...rest} render={props => (
        <Component {...props} />
    )}/>
    )
  }
}

/**
 * Component to render if not AuthRoute
 * @param {*} props 
 */
const NotAuthRoute = (props) => {
  const {component, ...rest} = props
    return (
      <Route {...rest} render={props => (
          <Redirect to={{
            pathname: constants.LOGIN_PATH,
            state: { from: props.location }
          }}/>
      )}/>
    )
}
  

function mapStateToProps(state) {
  return {
    isAuthenticated: isClientAuthenticated(state),
    isVerifyingToken: isVerifyTokenActive(state)
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    logout: () => dispatch(logoutAction())
  })
}

/**
 * AuthRoute
 * 
 * Conditional rendering logic really happens in 'onlyAuth' HOC.
 * Renders wrapped component when authenticated, ElseComponent 
 * if not.
 */
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    onlyAuth({ ElseComponent: NotAuthRoute })(AuthRoute)
  )
)