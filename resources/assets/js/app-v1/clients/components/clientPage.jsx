import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {denormalize, schema} from 'normalizr'
import {Nav, NavLink, NavItem, Collapse, Button } from 'reactstrap'
import { toast } from 'react-toastify'

import {clientsFetchAll} from '../actions'
import actionTypes from '../actionTypes'
import {getSelectedClientUI, getDenormalizedClients} from '../selectors'

import MasterItemList from '../../common/components/masterItemList'
import FilterableSelectBox from './filterableSelectBox'
import {ClientCreateInlineForm} from './clientCreateForms'

import ClientList from './clientList'
import ClientListLink from './clientListLink'
import ClientDetailPane from './clientDetailPane'

/**-------------------------------------------------
 * Clients page root
 * -------------------------------------------------
 * 
 * @todo Implement master/detail generic components from 'Common' module; 
 *       which is based on this impl.
 */
class ClientsPage extends React.Component {
    constructor(props){
        super(props)

        this.handleInputChanged = this.handleInputChanged.bind(this)
        this.handleClientsFilterChanged = this.handleClientsFilterChanged.bind(this)
        this.handleClientSelectionChanged = this.handleClientSelectionChanged.bind(this)
        this.filterClients = this.filterClients.bind(this)

        this.state = {
            clientName: "",
            clientOrgNr: "",
            filter: ""
        }
    }
    componentWillMount(){
        const {dispatch} = this.props
        dispatch(clientsFetchAll())
    }
    componentWillReceiveProps(nextProps){
        if(this.props.clients.length !== nextProps.clients.length){
            this.props.dispatch(clientsFetchAll())

            //no need to toast on first fetch, only when new are added
            if(this.props.clients.length != 0){
                toast.info('Client list updated!')
            }
        }
    }
    componentDidCatch(error, info) {
        console.log(error)
    }

    handleInputChanged(e){
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }
    handleClientsFilterChanged(filter){
        this.setState({
            filter
        })
    }
    handleClientSelectionChanged(e){
        const clientId = e.currentTarget.dataset.targetId
        // Update the UI state with the newly selected client (id)
        this.props.dispatch({
            type: actionTypes.CLIENTS_PAGE_SELECTED_MASTER_ID,
            payload: clientId
        })
    }

    filterClients(){
        const clientsArray = Object.keys(this.props.clients).map( key => {
            return this.props.clients[key]
        })

        const {filter} = this.state
        return clientsArray.filter( (client) => {
            if(filter.length == 0){
                return true
            }
            else {
                if(!isNaN(filter)){
                    return client.org_nr.indexOf(filter) !== -1
                }
                return client.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
            }
        })
    }

    render(){
        const filteredClients = this.filterClients()
        return (
            <div>
                <Nav className="justify-content-between">
                    <NavItem>
                        <NavLink><strong>Clients</strong></NavLink>
                    </NavItem>
                    <ClientCreateInlineForm />
                </Nav>
                <hr />
                <div className="container-fluid">
                    {/* Master detail */}
                    <div className="row">
                        {/* Master */}
                        <div className="col-sm-5 col-md-4 col-lg-3">
                            <div id="master-pane">
                                <FilterableSelectBox handleFilterChanged={this.handleClientsFilterChanged} 
                                    placeholderText="Filter name, org. nr etc.." />
                                <hr />
                                <MasterItemList items={filteredClients}>
                                    <ClientList handleSelectionChanged={this.handleClientSelectionChanged} 
                                        selectedItemId={this.props.selectedClientId} />
                                </MasterItemList>
                            </div>
                        </div>

                        {/* Detail */}
                        <div className="col">
                            <div id="detail-pane">
                                <ClientDetailPane client={this.props.selectedClient} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect( state => ({
    clients: getDenormalizedClients(state),
    selectedClientId: state.ui.clientPage.selectedClientId,
    selectedClient: getSelectedClientUI(state),
}))(ClientsPage))