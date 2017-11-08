import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {denormalize, schema} from 'normalizr'
import { Nav, NavLink, NavItem, Collapse, Button } from 'reactstrap'
import { toast } from 'react-toastify';

import {ordersFetchAll} from '../actions'
import {clientsFetchAll} from '../../clients/actions'
import actionTypes from '../actionTypes'
import {getSelectedOrderUI, getDenormalizedOrders} from '../selectors'

import Page from '../../common/components/page'
import { DetailPane, MasterPane, MasterItemListItem } from '../../common/components/masterDetailPage'

/**-------------------------------------------------
 * Orders Master List
 * -------------------------------------------------
 * 
 * Handle Order-model specific rendering
 * @todo Refine style
 */
class OrdersMasterList extends React.Component {
    constructor(props){
        super(props)
    }
    componentWillReceiveProps(next){
        //console.log(next)
    }
    render(){
        const {items, selectedItemId, handleItemSelectionChanged} = this.props

        const renderItems = items.map( item => {
            const active = item.id == selectedItemId
            const orderDateText = item.created_at.split('-')
            return (
                <MasterItemListItem 
                    key={item.id} 
                    item={item} 
                    active={active}
                    classes={'flex-column align-items-start'}
                    onClick={handleItemSelectionChanged}>

                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" style={{ fontSize: 14 +'px'}}><strong>#{item.code}</strong></h5>
                        <small >{`${orderDateText[1]}, ${orderDateText[0]}`}</small>
                    </div>
                    <p className="mb-1">{item.client.name}</p>
                    <small>Reg. by: {item.registrar.name}</small>

                </MasterItemListItem>
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
    selectedItemId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    handleItemSelectionChanged: PropTypes.func
}

/**-------------------------------------------------
 * Orders Master List
 * -------------------------------------------------
 * 
 * Order model view
 * @todo Implement fully
 */
class OrderDetailPane extends React.Component {
    render() {
        const {order} = this.props
        if(!order){
            return(
                <div className="row align-items-center">
                    <div className="col"></div>
                    <div className="col align-self-center">
                        <div className="empty-title">Select an order</div>
                    </div>
                    <div className="col"></div>
                </div>
            )
        } else {
            return(
                <div className="row align-items-center">
                    <div className="col">
                        <p>I have an order!</p>
                        <p>From: {order.registrar.name}, regarding {order.client.name} ({order.client.org_nr})</p>
                    </div>
                </div>
            )
        }
        
    }
}

/**-------------------------------------------------
 * Orders Page Higher Order Component
 * -------------------------------------------------
 * 
 * HOC of the OrderPage. Wraps the generic 'Page' component
 * to implement 'Order' specific data and display
 * @param {React.Component} WrappedComponent 
 * 
 * @todo Refine filter method
 * @todo Add recursive filtering (return a filtered result-set, to filter again. Multiple filters seperated by commas, i.e.)
 * @todo Perhaps add dropdown-buttons for filterbox, to change context of filtering.
 */
function ordersPageHOC(WrappedComponent){
    return class OrdersMasterDetailPage extends React.Component {
        constructor(props){
            super(props)

            this.filterOrders = this.filterOrders.bind(this)
            this.updateOrders = this.updateOrders.bind(this)
            this.updateSelectedItem = this.updateSelectedItem.bind(this)
        }
        
        filterOrders(filter){
            //console.log("HOC: Handle filter items" + filter)
            return this.props.orders.filter( order => {

                // TEXT FILTERING
                if(isNaN(filter)){

                    // YYYY-M(M) || YYYY-M(M)-D(D)
                    if(/^(20\d{2}-\d{1,2})$|^(20\d{2}-\d{1,2}-\d{1,2})$/.test(filter)) {
                        const parts = filter.split("-")
                        const day = parseInt(parts[2], 10)
                        const month = parseInt(parts[1], 10)
                        const year = parseInt(parts[0], 10)

                        const orderDate = order.created_at.split('-')
                        if(!day && orderDate[0] == year && orderDate[1] == month) {
                            console.log("Filtering by order created date (YYYY-MM), is NAN")
                            return true
                        } else if( orderDate[0] == year && orderDate[1] == month && orderDate[2].indexOf(day) !== -1) {
                            console.log("Filtering by order created date (YYYY-MM-DD), is NAN")
                            return true
                        }
                        
                    } else {
                        if(order.client.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || 
                            order.registrar.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1){
                            console.log("Filtering by order-client name OR registrar name")
                            return true
                        }
                    }
                } else { // NUMERIC FILTERING
                    
                    // YYYY
                    if(/^(\d{4})$/.test(filter)) { 
                        console.log("Filtering by order created date, IS NUMBER")
                        // Filter by order created date
                        const year = parseInt(filter, 10)
                        if(order.created_at.split('-')[0] == year){
                            // matches year
                            return true
                        }
                    } 

                    // Filter by code
                    if(order.code.indexOf(filter) !== -1){
                        console.log("Filtering by order code")
                        return true
                    }
                }
                return false
            })
            //return this.props.orders
        }
        updateOrders(){
            //console.log("HOC: Update order")
            this.props.dispatch(clientsFetchAll())
            this.props.dispatch(ordersFetchAll())
        }
        updateSelectedItem(e){
            console.log("HOC: Update selected item")
            this.props.dispatch({
                type: actionTypes.ORDERS_PAGE_SELECTED_MASTER_ID,
                payload: e.currentTarget.dataset.id
            })
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
                        <OrderDetailPane order={this.props.selectedOrder} />
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