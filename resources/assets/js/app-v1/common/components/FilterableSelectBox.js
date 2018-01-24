import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup, InputGroupButton, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


/**-------------------------------------------------
 * Filterable Select Box
 * -------------------------------------------------
 * 
 * A filtering input box with contextual pre-filtering.
 * The container component is soley responsible for
 * utilizing the context name/value as a pre-filtering
 * mechanism.
 * The context data is passed along with the filter
 * text to the callback 'props.handleFilterChanged',
 * and it takes the form: {name:string, display:string, value:mixed|optional, header:bool|optional}
 * The name is used for key-naming, and should be unique for each item.
 * The display is used to render the button text
 * The value is optional, but should be used to pass data to the filtering algorithm,
 * The header boolean is optional, but if present; 
 * indicates that the entry is only a explanatory header (not selectable) regardless 
 * of its value.
 *
 */
export default class FilterableSelectBox extends React.Component {
    constructor(props){
        super(props)

        this.toggleDropdown = this.toggleDropdown.bind(this)
        this.contextChanged = this.contextChanged.bind(this)
        this.state = {
            filterText: '',
            dropdownOpen: false,
            selectedContext: {name: '', display: 'All'}
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
                this.props.handleFilterChanged(this.state.filterText, this.state.selectedContext)
            }
        })
        
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    contextChanged(item){
        this.setState({
            selectedContext: item
        }, () => {
            if(this.props.handleFilterChanged){
                this.props.handleFilterChanged(this.state.filterText, this.state.selectedContext)
            }
        })
    }

    render(){
        const {placeholderText, contextOptions, showContextButton} = this.props

        // Show context button as default (undefined) or if explicitly set to true. 
        // Only an explicit false value will ignore to render it.
        if(showContextButton === undefined || showContextButton === true){

            // This item is always availalbe, to reset the context to all items
            const defaultItem = [
                { name: 'defaultAnyHeader', display: 'All', header: true},
                { name: 'defaultAny', value: null, display: 'All'}
            ]
            // Concat the default item with all context options
            const contextItems = defaultItem.concat(contextOptions).map((item) => {
                // Header items are not selectable, only for show.
                if(_.has(item, 'header')){
                    return (
                        <DropdownItem header key={item.name}>
                        {item.display}
                        </DropdownItem>
                    )
                }

                return (
                    <DropdownItem onClick={() => this.contextChanged(item)} key={item.name}>
                    {item.display}
                    </DropdownItem>
                )
            })

            return (
                <InputGroup>
                    <input ref="nativeInput" className="form-control" 
                        type="text" 
                        value={this.state.filterText} 
                        onChange={this.handleFilterInputChanged.bind(this)}
                        placeholder={placeholderText} 
                        aria-label={placeholderText} />
    
                    <InputGroupButton>
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle caret color="primary">{this.state.selectedContext.display}</DropdownToggle>
                            <DropdownMenu>
                                {contextItems}
                            </DropdownMenu>
                        </ButtonDropdown>
                    </InputGroupButton>
                </InputGroup>
            )
        } else {
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
}
FilterableSelectBox.defaultProps = {
    placeholderText: "Filter...",
    contextOptions: []
}