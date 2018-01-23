import React from 'react'
import Navbar from './Navbar'
import {BreadCrumbs} from '../../utils/bootstrap'

/**
 * Main header
 */
const Header = ({links, location, ...props}) => {
    return (
        <header {...props}>
            <Navbar links={links} />
            <BreadCrumbs location={location} />
        </header>
    )}
export default Header
