import React from 'react'

/**
 * 
 */
export default class Page extends React.Component {
    render(){

        const classes = this.props.fluid ? "container-fluid" : "container"
        return (
            <div>
                <hr />
                <div className={classes}>
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}