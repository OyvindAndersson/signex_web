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
 * Orders page root
 * -------------------------------------------------
 * 
 */
export default class OrdersPage extends React.Component {
    render(){
        return(<h1>ORDERS</h1>)
    }
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
        return(
            <a href="#" className={classes} {...this.props.linkProps}>
                {this.props.children}
            </a>
        )
    }
}
MasterItemListItem.propTypes = {
    active: PropTypes.bool,
    item: PropTypes.object.isRequired,
    linkProps: PropTypes.shape({
        onClick: PropTypes.func,
    })
}

class MasterItemList extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="list-group" >
                {this.props.children}
            </div>
        )
    }
}

class MasterPane extends React.Component {
    constructor(props){
        super(props)

        this.handleInputChanged = this.handleInputChanged.bind(this)
        this.handleItemFilterChanged = this.handleItemFilterChanged.bind(this)
        this.handleItemSelectionChanged = this.handleItemSelectionChanged.bind(this)
        this.filterItems = this.filterItems.bind(this)

        this.updateItems = this.updateItems.bind(this)
        this.updateSelectedItem = this.updateSelectedItem.bind(this)

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
        //e.persist()
        this.props.updateSelectedItem(e)
    }
    render() {
        const filteredItems = this.props.filterItems(this.state.filter)
        const selectedItemId = this.props.selectedItemId ? this.props.selectedItemId : 0

        return(
            <div className="col-sm-5 col-md-4 col-lg-3">
                <div id="master-pane">
                    <FilterableSelectBox {...this.props.filterBoxProps} />
                    <hr />
                    <MasterItemList items={filteredItems}>
                        <ItemList handleSelectionChanged={this.handleItemSelectionChanged} selectedItemId={selectedItemId} />
                    </MasterItemList>
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

    filterBoxProps: PropTypes.shape({
        handleFilterChanged: PropTypes.func.isRequired,
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

function ordersPageHOC(Page){
    return class OrdersMasterDetailPage extends React.Component {
        constructor(props){
            super(props)

            this.handleFilterChanged = this.handleFilterChanged.bind(this)
            this.updateOrders = this.updateOrders.bind(this)
            this.updateSelectedItem = this.updateSelectedItem.bind(this)
        }
        
        handleFilterChanged(filter){
            console.log("HOC: Handle filter changed")
        }
        updateOrder(){
            console.log("HOC: Update order")
        }
        updateSelectedItem(){
            console.log("HOC: Update selected item")
            // set prop for detailPane: selectedItem
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

                filterBoxProps: {
                    handleFilterChanged: this.handleFilterChanged,
                    placeholderText: "Filter orders..."
                }
            }

            return (
                <Page {...this.props} {...pageProps}>
                    <MasterPane {...masterPaneProps}>
                        <OrdersList />
                    </MasterPane>
                    <DetailPane>
                        <OrdersDetail />
                    </DetailPane>
                </Page>
            )
        }
    }
}

/*
export default withRouter(connect( state => ({
    orders: getDenormalizedOrders(state),
    selectedOrderId: state.ui.orderPage.selectedOrderId,
    selectedOrder: getSelectedOrderUI(state),
}))(OrdersPage))*/