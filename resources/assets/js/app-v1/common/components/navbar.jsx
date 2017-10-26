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
import {links} from '../../appRoutes'

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
        // display logged-in navbar
        } else {
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
                    <NavbarBrand href="/">SignEx</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {navItems}
                        </Nav>
                    </Collapse>
                    <span className="navbar-text">
                        <small>{this.props.user ? this.props.user.email : null}</small>
                    </span>
                </BSNavbar>
            </div>
        );
    }
}

export default withRouter(connect((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    user: state.auth.user,
    token: state.auth.token
}))(Navbar))