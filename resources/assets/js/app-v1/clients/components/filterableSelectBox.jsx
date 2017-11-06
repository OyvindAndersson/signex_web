import React from 'react'

export default class FilterableSelectBox extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            filterText: ''
        }
    }

    handleFilterInputChanged(e){
        this.setState({
            filterText: e.target.value
        }, () => {
            if(this.props.handleFilterChanged){
                this.props.handleFilterChanged(this.state.filterText)
            }
        })
        
    }
    render(){
        const {placeholderText} = this.props
        return (
            <div className="input-group">
                <input className="form-control" 
                    type="text" 
                    value={this.state.filterText} 
                    onChange={this.handleFilterInputChanged.bind(this)}
                    placeholder={placeholderText} 
                    aria-label={placeholderText} />
                <span className="input-group-btn">
                    <button className="btn" type="button">Go!</button>
                </span>
            </div>
        )
    }
}

FilterableSelectBox.defaultProps = {
    placeholderText: "Filter..."
}