import React from 'react'

/**
 * 
 */
export default class Page extends React.Component {
    render(){

        const classes = this.props.fluid ? "container-fluid" : "container"
        const rowClasses = this.props.center ? "justify-content-md-center" : ''
        
        const isLoadingData = this.props.isLoadingData

        if(isLoadingData){
            return (
                <div>
                    <hr />
                    <div className={classes}>
                        <div className={`row ${rowClasses}`}>
                            Loading page data...
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <hr />
                    <div className={classes}>
                        <div className={`row ${rowClasses}`}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            )
        }
    }
}