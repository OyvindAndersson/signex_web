import React from 'react'
import { connect } from 'react-redux'
import {Route, Link, Redirect} from 'react-router-dom'
import {authUserToken} from '../../auth/actions'

console.log("App.jsx")

class LandingPage extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const {computedMatch, isAuthenticated} = this.props
        const pathname = this.props.location.state ? this.props.location.state.from.pathname : "nowhere"
        
        return(
            <div>
                <h4>LandingPage <small>Auth: {isAuthenticated ? 'true' : 'false'}</small></h4>
                <p>You came from {pathname}</p>
            </div>
        )
    }
}

export default connect( 
    state => ({
        isAuthenticated: state.auth.isAuthenticated
    })
)(LandingPage)