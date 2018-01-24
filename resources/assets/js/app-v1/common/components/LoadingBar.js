import React from 'react'

export default class LoadingBar extends React.Component {
    render(){
        const { style } = this.props
        return(
            <div className="progress" style={style ? style : null}>
                <div className="progress-bar progress-bar-striped progress-bar-animated" 
                role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}></div>
            </div>
        )
    }
}