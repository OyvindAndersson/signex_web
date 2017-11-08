import React from 'react'
import PropTypes from 'prop-types'
import { Nav, NavLink, NavItem } from 'reactstrap'

/**
 * 
 */
export default class Page extends React.Component {
    render(){
        const pageTitle = this.props.pageTitle ? this.props.pageTitle : "Page"

        return (
            <div>
                <Nav className="justify-content-between">
                    <NavItem>
                        <NavLink><strong>{pageTitle}</strong></NavLink>
                    </NavItem>
                </Nav>
                <hr />
                <div className="container-fluid">
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
Page.propTypes = {
    pageTitle: PropTypes.string
}