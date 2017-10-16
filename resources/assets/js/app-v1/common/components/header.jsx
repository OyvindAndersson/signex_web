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

export default class Header extends React.Component {
    render(){
        return(
            <header>
                <Navbar />
            </header>
        );
    }
}


class Navbar extends React.Component {
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
        const links = [
            {to: "/", title: "Landing page"},
            {to: "/login", title: "Login"}
        ]
        const navItems = links.map((link) => {
            // Instead of using NavItem component, we must write out the <li>
            // markout to be compatible with react-router Link component
            return(
                <NavItem key={link.to}>
                    <NavLink tag={Link} to={link.to}>{link.title}</NavLink>
                </NavItem>
            );
        });
        return(
            <div>
                <BSNavbar color="faded" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <NavbarBrand href="/">SignEx</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {navItems}
                        </Nav>
                    </Collapse>
                </BSNavbar>
            </div>
        );
    }
}
/*
<BSNavbar color="faded" light expand="md">
                    <NavbarToggler onClick={this.toggleOpen} />
                    <NavbarBrand href="/">SignEx</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {navItems}
                        </Nav>
                    </Collapse>
                </BSNavbar>
*/