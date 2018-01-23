import React from 'react'
import {Link} from 'react-router-dom'
import { 
    Navbar as BSNavbar,
    Nav,
    NavbarToggler,
    NavbarBrand,
    Collapse,
    NavItem,
    NavLink
} from 'reactstrap'

/**
* Main navbar
*/
export default class Navbar extends React.Component {
    constructor(props){
        super(props)

        this.toggleOpen = this.toggleOpen.bind(this);
        this.state = {
            isOpen: false
        }
    }

    toggleOpen(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
        
        const links = this.props.links.map((link) => {
            return (
                <NavItem key={`${link.to}-key`}>
                    <NavLink tag={Link} to={link.to}>{link.title}</NavLink>
                </NavItem>
            )
        })

        return(
            <div>
                <BSNavbar color="faded" light expand="md">
                    <NavbarToggler onClick={this.toggleOpen} />
                    <NavbarBrand href="/">SignEx <small>{SIGNEX.versionString()}</small></NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {links}
                        </Nav>
                    </Collapse>
                </BSNavbar>
            </div>
        );
    }
}