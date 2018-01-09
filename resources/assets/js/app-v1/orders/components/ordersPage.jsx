import React from 'react'
import { connect } from 'react-redux'
import {Route, Link, Redirect, Switch, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {denormalize, schema} from 'normalizr'
import moment from 'moment'
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'

import {ordersFetchAll} from '../actions'
import {clientsFetchAll} from '../../clients/actions'
import actionTypes from '../actionTypes'
import {getSelectedOrderUI, getDenormalizedOrders, getIsFetchingOrders} from '../selectors'

import Page from '../../common/components/page'
import PageSubNavbar from '../../common/components/pageSubNavbar'
import { DetailPane, MasterPane, MasterItemListItem, EmptyDetailPane } from '../../common/components/masterDetailPage'
import CreateOrderView from './createOrderView'

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
            
            const due = moment(item.due_at)
            const now = moment()
            const dueIn = due.diff(now, 'days') // days until due
            const humanDueIn = due.from(now) // display text

            const severityClass = (dueIn < 4 && dueIn >= 2) ? 'bg-warning text-white' : ( dueIn <= 1 ? 'bg-danger text-white' : '')

            return (
                <MasterItemListItem 
                    key={item.id} 
                    item={item} 
                    active={active}
                    classes={`flex-column align-items-start`}
                    onClick={handleItemSelectionChanged}>

                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" style={{ fontSize: 14 +'px'}}><strong>#{item.code}</strong></h5>
                        <span className={`badge badge-info ${severityClass}`}>{`Due ${humanDueIn}`}</span>
                    </div>
                    <p className="orders-master-list-item-client mb-1 font-weight-bold">{item.client.name}</p>
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

        const dueAt = moment(order.due_at).format(SIGNEX.humanDateFormat)
        const dueAtWeek = moment(order.due_at).isoWeek()
        const createdAt = moment(order.created_at).format(SIGNEX.humanDateFormat)

        return(
            <div className="row align-items-center">
                <div className="col">
                    <h2 className="text-primary">{order.client.name} 
                        <small className="text-dark"> #{order.code}</small>
                    </h2>
                    <hr />
                    <div className="row">
                        <div className="col-md-6">
                            <p>{order.description}</p>
                        </div>
                        <div className="col-md-6">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <small>Status: </small>
                                    <a href="#" title={order.status.description}>{order.status.name}</a>
                                </li>
                                <li className="list-group-item">
                                    <small>Manager: </small>
                                    <a href="#">{order.registrar.name}</a>
                                </li>
                                <li className="list-group-item">
                                    <small>Registered: </small>
                                    {createdAt}
                                </li>
                                <li className="list-group-item">
                                    <small>Due: </small>
                                    {dueAt} <em>(Week {dueAtWeek})</em>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**-------------------------------------------------
 * Orders Page Higher Order Component (/orders/)
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

            this.state = {
                hasError: false,
                errorMessage: ''
            }
        }

        componentDidCatch(error, info) {
            // Display fallback UI
            this.setState({ hasError: true, errorMessage: `${error.message} @ ${error.fileName} | L: ${error.lineNumber}` })
        }
        
        filterOrders(filter, context){
            return this.props.orders.filter( order => {

                // CONTEXT FILTERING: Set the context for which the orders should be filtered.
                // Only filter orders with status id == context.value
                if(context && _.startsWith(context.name, 'status_id')){
                    if(order.status_id != context.value){
                        return false
                    }
                }
                // Only filter orders with user id == context.value (registrar)
                if(context && _.startsWith(context.name, 'user_id')){
                    if(order.user_id != context.value){
                        return false
                    }
                }
                // Only filter orders due urgently (1-2 days)
                if(context && context.name === 'due#1'){
                    const due = moment(order.due_at)
                    const now = moment()
                    const daysUntil = due.diff(now, 'days')+1 // Count start also
                    if(daysUntil > 2){
                        return false
                    }
                }
                // Only filter orders due this week (or the weeks before...)
                if(context && context.name === 'due#2'){
                    const due = moment(order.due_at)
                    const now = moment()
                    if(due.isoWeek() > now.isoWeek()){
                        return false
                    }
                }
                // Only filter orders due next week
                if(context && context.name === 'due#3'){
                    const due = moment(order.due_at)
                    const then = moment().add(1, 'weeks')
                    if(due.isoWeek() !== then.isoWeek()){
                        return false
                    }
                }

                // TEXT FILTERING
                if(isNaN(filter)){
                    // Filtering by order-client name OR registrar name
                    if(order.client.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || 
                        order.registrar.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1){
                        return true
                    }
                } else { // NUMERIC FILTERING
                    
                    // YYYY - year regex
                    if(/^(\d{4})$/.test(filter)) { 
                        // Filter by order created date
                        const year = parseInt(filter, 10)
                        if(order.created_at.split('-')[0] == year){
                            // matches year
                            return true
                        }
                    } 

                    // Filter by order code
                    if(order.code.indexOf(filter) !== -1){
                        return true
                    }
                }
                return false
            })
        }
        updateOrders(){
            this.props.dispatch(clientsFetchAll())
            this.props.dispatch(ordersFetchAll())
        }
        updateSelectedItem(e){
            this.props.dispatch({
                type: actionTypes.ORDERS_PAGE_SELECTED_MASTER_ID,
                payload: e.currentTarget.dataset.id
            })
        }

        render(){
            const {selectedOrder, computedMatch, match, dispatch} = this.props 

            /**
             * Props specific to the Order page sub-navbar
             */
            const pageNavbarProps = {
                pageLinks: [ 
                    { title: "My orders page", props: { to: `${match.url}`, tag: Link }, strong: true },
                    { title: "Create new", props: { to: `${match.url}/create`, tag: Link }} 
                ]
            }

            /** 
             * Most logic is tied together by master pane 
             * 
             * contextOptions: 
             * @todo: Get display strings and values from the store (statuses, users, types)
             * 
            */
            const masterPaneProps = {
                items: this.props.orders,
                selectedItem: this.props.selectedOrder,
                selectedItemId: this.props.selectedOrderId,
                isLoading: this.props.isFetchingOrders,

                updateItems: this.updateOrders,
                updateSelectedItem: this.updateSelectedItem,

                filterItems: this.filterOrders,
                filterBoxProps: {
                    placeholderText: "Search...",
                    contextOptions: [
                        { name: 'dueHeader', display: 'Due', header:true },
                        { name: 'due#1', display: 'Urgently!' },
                        { name: 'due#2', display: 'This week' },
                        { name: 'due#3', display: 'Next week' },
                        { name: 'statusHeader', display: 'Statuses', header:true },
                        { name: 'status_id#1', value: 1, display: 'Quote' },
                        { name: 'status_id#2', value: 2, display: 'Registered' },
                        { name: 'status_id#3', value: 3, display: 'In progress' },
                        { name: 'status_id#4', value: 4, display: 'Finished / Sent' },
                        { name: 'status_id#5', value: 5, display: 'Archived' },
                        { name: 'userHeader', display: 'Registrar', header:true },
                        { name: 'user_id#1', value: 1, display: 'Øyvind' },
                        { name: 'user_id#2', value: 2, display: 'Gianni' },
                        { name: 'user_id#3', value: 3, display: 'Stinny' },
                        { name: 'typeHeader', display: 'Types', header:true },
                        { name: 'type_id#1', value: 1, display: 'Some type' }
                    ]   
                }
            }

            // Display errorpage
            if(this.state.hasError){
                return (
                    <div>
                        <PageSubNavbar {...pageNavbarProps}>
                        </PageSubNavbar>

                        <WrappedComponent>
                            <div className="col-md-12">

                                <Alert color="danger">
                                    <h4 className="alert-heading">Oops!</h4>
                                    <p>
                                    An error occured while trying to render this page. Contact administrator for help.
                                    </p>
                                    <hr />
                                    <p className="mb-0">
                                    Code: <code>{this.state.errorMessage}</code>
                                    </p>
                                </Alert>
                            </div>
                        </WrappedComponent>
                    </div>
                )
            }
            
            //const {computedMatch, isAuthenticated, match, user, dispatch} = this.props
            return (
                <div>
                    <PageSubNavbar {...pageNavbarProps}>
                    </PageSubNavbar>

                    {/* ORDERS - INDEX */}
                    <Route exact path={`${match.url}`} render={ routeProps => (
                        <WrappedComponent {...this.props} fluid={true}>
                            
                            <MasterPane {...masterPaneProps}>
                                <OrdersMasterList />
                            </MasterPane>
                            <DetailPane>
                            { selectedOrder ? (
                                <OrderDetailPane order={selectedOrder} />
                            ) : (
                                <EmptyDetailPane>
                                </EmptyDetailPane>
                            ) }
                            </DetailPane>
                        </WrappedComponent>
                    )} />
                    
                    {/* ORDERS/CREATE */}
                    <Route path={`${match.url}/create`} render={ routeProps => (
                        <WrappedComponent {...this.props} fluid={false}>
                            <CreateOrderView {...routeProps} /> 
                        </WrappedComponent>
                    )} />

                    
                </div>
            )
        }
    }
    
}
ordersPageHOC.propTypes = {
    orders: PropTypes.array.isRequired,
    selectedOrder: PropTypes.object.isRequired,
    selectedOrderId: PropTypes.number.isRequired
}


export default withRouter(connect( state => ({
    orders: getDenormalizedOrders(state),
    selectedOrderId: state.ui.orderPage.selectedOrderId,
    selectedOrder: getSelectedOrderUI(state),
    isFetchingOrders: getIsFetchingOrders(state)
}))(ordersPageHOC(Page)))