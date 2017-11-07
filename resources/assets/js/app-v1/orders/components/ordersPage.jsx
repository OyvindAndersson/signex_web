import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {denormalize, schema} from 'normalizr'
import { Nav, NavLink, NavItem, Collapse, Button } from 'reactstrap'
import { toast } from 'react-toastify';

import {ordersFetchAll} from '../actions'
import actionTypes from '../actionTypes'
import {getSelectedOrderUI, getDenormalizedOrders} from '../selectors'

//import MasterItemList from '../../common/components/masterItemList'

/**-------------------------------------------------
 * TODOS
 * -------------------------------------------------
 * 
 * - Show order info on ItemLink, and detail pane
 * 
 * 
 * 
 */


class FilterableSelectBox extends React.Component {
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

class MasterItemListItem extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            active: false
        }
    }
    componentWillReceiveProps(newProps){
        if(newProps.active !== this.props.active){
            this.setState({ active: newProps.active })
        }
    }
    render(){
        const classes = `list-group-item list-group-item-action ${this.state.active ? 'active' : ''}`

        const childrenWithProps = React.Children.map(this.props.children, (child) => 
            React.cloneElement(child, {
                item: this.props.item
            })
        );
        return(
            <a href="#" className={classes} onClick={this.props.onClick} data-id={this.props.item.id}>
                THIS IS IT!
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

class OrdersMasterList extends React.Component {
    constructor(props){
        super(props)
    }
    componentWillReceiveProps(next){
        console.log(next)
    }
    render(){
        const {items, selectedItemId, handleItemSelectionChanged} = this.props

        const renderItems = items.map( item => {
            const active = item.id == selectedItemId
            return (
                <MasterItemListItem 
                    key={item.id} 
                    item={item} 
                    active={active}
                    onClick={handleItemSelectionChanged} />
            )
        })

        return (
            <div className="list-group" >
                {renderItems}
            </div>
        )
    }
}
OrdersMasterList.propTypes = {
    items: PropTypes.array,
    selectedItemId: PropTypes.number,
    handleItemSelectionChanged: PropTypes.func
}

class MasterPane extends React.Component {
    constructor(props){
        super(props)

        this.handleInputChanged = this.handleInputChanged.bind(this)
        this.handleItemFilterChanged = this.handleItemFilterChanged.bind(this)
        this.handleItemSelectionChanged = this.handleItemSelectionChanged.bind(this)

        this.state = {
            filter: ""
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
    handleItemFilterChanged(filter){
        this.setState({
            filter
        })
    }
    handleItemSelectionChanged(e){
        this.props.updateSelectedItem(e)
    }

    render() {
        const showFilterBox = this.props.filterItems ? true : false
        const filteredItems = showFilterBox ? this.props.filterItems(this.state.filter) : this.props.items
        const selectedItemId = this.props.selectedItemId ? this.props.selectedItemId : 0

        
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
    selectedItemId: PropTypes.number,

    updateItems: PropTypes.func.isRequired,
    updateSelectedItem: PropTypes.func.isRequired,
    filterItems: PropTypes.func,

    filterBoxProps: PropTypes.shape({
        placeholderText: PropTypes.string
    }),
}

class DetailPane extends React.Component {
    render(){
        const selectedItem = this.props.selectedItem ? this.props.selectedItem : null
        return(
            <div className="col">
                <div id="detail-pane">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
DetailPane.propTypes = {
    selectedItem: PropTypes.object
}

class Page extends React.Component {
    render(){
        const pageTitle = this.props.pageTitle ? this.props.pageTitle : "Page"

        return (
            <div>
                <Nav className="justify-content-between">
                    <NavItem>
                        <NavLink><strong>{pageTitle}</strong></NavLink>
                    </NavItem>
                </Nav>
                <hr />
                <div className="container-fluid">
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
Page.propTypes = {
    pageTitle: PropTypes.string
}

function ordersPageHOC(WrappedComponent){
    return class OrdersMasterDetailPage extends React.Component {
        constructor(props){
            super(props)

            this.filterOrders = this.filterOrders.bind(this)
            this.updateOrders = this.updateOrders.bind(this)
            this.updateSelectedItem = this.updateSelectedItem.bind(this)
        }
        
        filterOrders(filter){
            console.log("HOC: Handle filter items" + filter)
            return this.props.orders
        }
        updateOrders(){
            console.log("HOC: Update order")
            this.props.dispatch(ordersFetchAll())
        }
        updateSelectedItem(e){
            console.log("HOC: Update selected item")
            // set prop for detailPane: selectedItem
            console.log(e.target.dataset)
        }

        render(){
            const pageProps = {
                pageTitle: "My orders page"
            }
            const masterPaneProps = {
                items: this.props.orders,
                selectedItem: this.props.selectedOrder,
                selectedItemId: this.props.selectedOrderId,

                updateItems: this.updateOrders,
                updateSelectedItem: this.updateSelectedItem,

                filterItems: this.filterOrders,
                filterBoxProps: {
                    placeholderText: "Filter orders..."
                }
            }

            return (
                <WrappedComponent {...this.props} {...pageProps}>
                    <MasterPane {...masterPaneProps}>
                        <OrdersMasterList />
                    </MasterPane>
                    <DetailPane>
                        {/* <OrdersDetail /> */}
                        <p>Detail pane</p>
                    </DetailPane>
                </WrappedComponent>
            )
        }
    }
    OrdersMasterDetailPage.propTypes = {
        orders: PropTypes.array.isRequired,
        selectedOrder: PropTypes.object.isRequired,
        selectedOrderId: PropTypes.number.isRequired
    }
}

export default withRouter(connect( state => ({
    orders: getDenormalizedOrders(state),
    selectedOrderId: state.ui.orderPage.selectedOrderId,
    selectedOrder: getSelectedOrderUI(state),
}))(ordersPageHOC(Page)))