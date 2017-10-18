import React from 'react'
import {Link} from 'react-router-dom'
import {Nav, NavItem, NavLink} from 'reactstrap'

export default class PageSubNavbar extends React.Component {
    constructor(props){
        super(props)

        console.log(props)
    }
    render(){
        const pageLink = (
            <NavItem>
                <NavLink><strong>{this.props.pageTitle}</strong></NavLink>
            </NavItem>
        )
        const links = this.props.links.map((link, index) => {
            console.log({...link.props})
            return (
                <NavItem key={`page-sub-navbar-${index}`}>
                    <NavLink {...link.props}>{link.title}</NavLink>
                </NavItem>
            )
        })
        return(
            <Nav>
                {pageLink}
                {links}
            </Nav>
        )
    }
}