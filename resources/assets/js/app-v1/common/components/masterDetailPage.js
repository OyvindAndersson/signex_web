import React from 'react'
import PropTypes from 'prop-types'
//import { Nav, NavLink, NavItem, Collapse, Button } from 'reactstrap'

import FilterableSelectBox from './FilterableSelectBox'
import LoadingBar from './LoadingBar'

/**-------------------------------------------------
 * Master Item List Item
 * -------------------------------------------------
 * 
 * Wrapper for links/items in the master pane
 * @todo Better class handling. Currently hacky-wacky
 */
export class MasterItemListItem extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            active: false
        }
    }
    componentWillReceiveProps(newProps){
        this.setState({ active: newProps.active })
    }
    render(){
        const {classes} = this.props
        const metaClasses = `list-group-item list-group-item-action ${classes ? classes : ''} ${this.state.active ? 'active' : ''}`
        return(
            <a href="#" className={metaClasses} onClick={this.props.onClick} data-id={this.props.item.id}>
                {this.props.children}
            </a>
        )
    }
}
MasterItemListItem.propTypes = {
    active: PropTypes.bool,
    item: PropTypes.shape({
        id: PropTypes.number.isRequired
    }).isRequired,
    onClick: PropTypes.func
}

/**-------------------------------------------------
 * Master Pane
 * -------------------------------------------------
 * 
 * Wrapper for the master/item-list section of the page
 * @todo Do we need all this logic-handling here?
 */
export class MasterPane extends React.Component {
    constructor(props){
        super(props)

        this.handleInputChanged = this.handleInputChanged.bind(this)
        this.handleItemFilterChanged = this.handleItemFilterChanged.bind(this)
        this.handleItemSelectionChanged = this.handleItemSelectionChanged.bind(this)

        this.state = {
            filter: "",
            context: null
        }
    }
    componentWillMount(){
        this.props.updateItems()
    }
    handleInputChanged(e){
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }
    handleItemFilterChanged(filter, context){
        this.setState({
            filter,
            context
        })
    }
    handleItemSelectionChanged(e){
        this.props.updateSelectedItem(e)
    }

    render() {
        const showFilterBox = this.props.filterItems ? true : false
        const filteredItems = showFilterBox ? this.props.filterItems(this.state.filter, this.state.context) : this.props.items
        const selectedItemId = this.props.selectedItemId ? this.props.selectedItemId : 0
        const {isLoading} = this.props

        
        const childrenWithProps = React.Children.map(this.props.children, (child) => 
            React.cloneElement(child, {
                handleItemSelectionChanged: this.handleItemSelectionChanged,
                items: filteredItems,
                selectedItemId: selectedItemId
            })
        );

        return(
            <div className="col-sm-5 col-md-4 col-lg-3">
                <div id="master-pane">
                    { showFilterBox ? (
                    <FilterableSelectBox {...this.props.filterBoxProps} handleFilterChanged={this.handleItemFilterChanged} />
                    ) : null }
                    &nbsp;
                    { isLoading ? (<LoadingBar height="10px" />) : null }
                    <hr />
                    <div className="list-group" >
                        {childrenWithProps}
                    </div>
                    
                    
                </div>
            </div>
        )
    }
}
MasterPane.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.object,
    selectedItemId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),

    updateItems: PropTypes.func.isRequired,
    updateSelectedItem: PropTypes.func.isRequired,
    filterItems: PropTypes.func,

    filterBoxProps: PropTypes.shape({
        placeholderText: PropTypes.string
    }),
}

/**-------------------------------------------------
 * Detail Pane
 * -------------------------------------------------
 * 
 * Wrapper for the detail-section of the page
 * 
 */
export class DetailPane extends React.Component {
    render(){
        return(
            <div className="col">
                <div id="detail-pane">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

/**-------------------------------------------------
 * Detail Pane
 * -------------------------------------------------
 * 
 * @param {object} props 
 * 
 * @todo Show appropriate message if no items are in master list.
 */
export const EmptyDetailPane = (props) => {
    return (
        <div className="row align-items-center">
            <div className="col"></div>
            <div className="col align-self-center">
                <div className="empty-title">{"<-"} Select something!</div>
                {props.children}
            </div>
            <div className="col"></div>
        </div>
    )
}
