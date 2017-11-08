import React from 'react'
import PropTypes from 'prop-types'

/**-------------------------------------------------
 * Filterable Select Box
 * -------------------------------------------------
 * 
 * A filtering input box.
 * @todo Provide support for contextual filtering: 
 * Drop-down buttons embedded in the input-field
 * to change context
 * 
 *   ---------------------------------
 *   | Input text here... | CONTEXT ^|
 *   ---------------------------------
 */
export default class FilterableSelectBox extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            filterText: ''
        }
    }
    componentDidMount(){
        if(this.refs.nativeInput){
            this.refs.nativeInput.focus()
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
                <input ref="nativeInput" className="form-control" 
                    type="text" 
                    value={this.state.filterText} 
                    onChange={this.handleFilterInputChanged.bind(this)}
                    placeholder={placeholderText} 
                    aria-label={placeholderText} />
            </div>
        )
    }
}
FilterableSelectBox.defaultProps = {
    placeholderText: "Filter..."
}