import React from 'react'
import {Link} from 'react-router-dom'
import {Nav, NavItem, NavLink} from 'reactstrap'

/**-------------------------------------------------
 * Page Sub-Navbar
 * -------------------------------------------------
 * 
 * Opt-in component to display a sub-navbar on a page.
 * prop.children are put on the right side of the bar,
 * whilst all normal links are alignable
 * 
 * @todo More flexible alignment and children handling
 */
export default class PageSubNavbar extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const leftSide = this.props.pageLinks.filter( link => {
            if(!link.align || link.align !== 'right' ) {
                return true
            }
            return false
        }).map((link, index) => {
            return (
                <NavItem key={`page-sub-navbar-${index}`}>
                    <NavLink {...link.props}>{link.strong ? (<strong>{link.title}</strong>) : link.title}</NavLink>
                </NavItem>
            )
        })

        const rightSide = this.props.pageLinks.filter( link => {
            if(link.align && link.align === 'right'){
                return true
            }
            return false
        }).map((link, index) => {
            return (
                <NavItem key={`page-sub-navbar-${index}`}>
                    <NavLink {...link.props}>{link.title}</NavLink>
                </NavItem>
            )
        })


        return(
            <nav className="navbar">
                <Nav className="mr-auto">
                    {leftSide}
                </Nav>
                <Nav>
                    {rightSide}
                    {this.props.children}
                </Nav>
            </nav>
        )
    }
}