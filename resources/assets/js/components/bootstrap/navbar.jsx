import React from 'react'
import {Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
  } from 'reactstrap';

/**
 * Bootstrap 4 Navbar
 */
export default class NavBar extends React.Component {
    constructor(props){
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        }
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render(){
        const navItems = this.props.links.map((link) => {
            // Instead of using NavItem component, we must write out the <li>
            // markout to be compatible with react-router Link component
            return(
                <li key={link.to} className="nav-item">
                    <Link className="nav-link" to={link.to}>{link.title}</Link>
                </li>
            );
        });

        return(
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <NavbarBrand href="/">SignEx</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {navItems}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}