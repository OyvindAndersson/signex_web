import React from 'react'

export default class FilterableSelectBox extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <select ref="ns" name={this.props.name}>
                </select>
            </div>
        )
    }
}