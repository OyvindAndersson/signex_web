import React from 'react'
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import { 
    Navbar as BSNavbar,
    Nav,
    NavbarToggler,
    NavbarBrand,
    Collapse,
    NavItem,
    NavLink
} from 'reactstrap'
import {links} from '../../routes'

import { authWrapper } from '../../auth'

// Temp 
//-------------------------------------------------
const UserLink = props => (
    <span className="navbar-text">
        <small>{props.user ? props.user.email : null}</small>
    </span>
)
const AuthUserLink = connect( state => ({
    isAuthenticated: state.auth.isAuthenticated,
    // only show loading if user is authed, but not fetched yet.
    isAuthenticating: state.auth.user === null && state.auth.isAuthenticated,
    user: state.auth.user
}))
(authWrapper({
    AuthenticatingComponent: () => (<span><em>Loading user...</em></span>)
})
(UserLink))
//-------------------------------------------------

/**
* Main navbar
*/
class Navbar extends React.Component {
    constructor(props){
        super(props)

        this.toggleOpen = this.toggleOpen.bind(this);
        this.state = {
            isOpen: false,
            role: this.props.role
        }
    }
    toggleOpen(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    getRouteNames() {
        const {isAuthenticated, role} = this.props

        // Only display public navbar
        if(!isAuthenticated || !localStorage.getItem('token')){
            return links.public.map((link) => {
                return (
                    <NavItem key={`${link.to}-key`}>
                        <NavLink tag={Link} to={link.to}>{link.title}</NavLink>
                    </NavItem>
                )
            })
        } 
        else {
            return links.private.map((link) => {
                return (
                    <NavItem key={`${link.to}-key`}>
                        <NavLink tag={Link} to={link.to}>{link.title}</NavLink>
                    </NavItem>
                )
            })
        }
    }
    render(){
        const {user} = this.props
        const navItems = this.getRouteNames()

        return(
            <div>
                <BSNavbar color="faded" light expand="md">
                    <NavbarToggler onClick={this.toggleOpen} />
                    <NavbarBrand href="/">SignEx <small>{SIGNEX.versionString()}</small></NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {navItems}
                        </Nav>
                    </Collapse>
                   <AuthUserLink />
                </BSNavbar>
            </div>
        );
    }
}

export default withRouter(connect((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    user: state.auth.user
}))(Navbar))