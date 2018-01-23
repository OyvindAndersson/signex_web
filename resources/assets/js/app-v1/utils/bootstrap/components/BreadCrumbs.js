import React from 'react'
import {Link} from 'react-router-dom'

/**
 * BreadCrumbs
 * 
 * Generates breadcrumbs with react-router Links for
 * a given location object from react-router
 * @param {*} param0 
 */
const BreadCrumbs = ({ location, ...rest}) => {
    if(!location || !location.pathname){
        return null
    }
    // Isolate all pathnames and remove empty values
    const paths = _.compact(_.split(location.pathname, '/'))
    const breadCrumbs = paths.map( (link, i) => {

        // The actual href must include all crumbs 'behind" itself in the list, to make a valid URI
        var href = (i == 0) ? `/${link}` : null
        if(!href){
            href = ''
            for(var j = 0; j <= i; j++ ) {
                href = href + `/${paths[j]}`
            }
        }

        const isActive = i == (paths.length - 1)
        if(isActive){
            return(
                <li key={`${link}-li`} className="breadcrumb-item active" aria-current="page">
                    {link}
                </li>
            )
        } else {
            return(
                <li key={`${link}-li`} className="breadcrumb-item">
                    <Link to={href}>{link}</Link>
                </li>
            )
        }
    })

    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {breadCrumbs}
            </ol>
        </nav>
    )
}
export default BreadCrumbs