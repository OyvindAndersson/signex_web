import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom'
import { denormalize, schema } from 'normalizr'

import actionTypes from 'Clients/actionTypes'
import { loadClientsAction, updateClientsMasterListItemIdAction } from 'Clients/actions'
import { getSelectedClientUI, getDenormalizedClients, createdClientSuccess, isLoadingClients } from 'Clients/selectors'
import { ClientCreateInlineForm } from './ClientCreateForms'
import ClientDetailPane from './ClientDetailPane'
import ClientsMasterList from './ClientsMasterList'

import Page from 'Common/components/Page'
import PageSubNavbar from 'Common/components/pageSubNavbar'
import { DetailPane, MasterPane, EmptyDetailPane } from 'Common/components/masterDetailPage'
import { toast } from 'react-toastify'

/**
 * 
 */
function clientsPageHOC(WrappedComponent) {
    return class ClientsMasterDetailPage extends React.Component {
        constructor(props){
            super(props)

            this.getMasterPaneProps = this.getMasterPaneProps.bind(this)
            this.getPageNavProps = this.getPageNavProps.bind(this)
            this.filterClients = this.filterClients.bind(this)
        }

        componentWillMount(){
            // Either loads from db, or it exists in cache already.
            this.props.loadClients()
        }

        filterClients(filter, context){
            if(filter.length == 0){
                return this.props.clients
            }
            return this.props.clients.filter( client => {
                // Only filter clients where org_nr starts with filter
                if(context && _.startsWith(context.name, 'org_nr')){
                    return false
                }
                // TEXT FILTERING
                if(isNaN(filter)){
                    // Filtering by order-client name OR registrar name
                    if(client.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1){
                        return true
                    }
                } else {
                    if(_.startsWith(client.org_nr, filter)){
                        return true
                    }
                }

                return false
            })
        }

        /**
         * @todo Do we need to pass both items: and possibly return the list also with filterClients?
         * Seems bloated...
         */
        getMasterPaneProps(){
            return {
                items: this.props.clients,
                selectedItem: this.props.selectedClient,
                selectedItemId: this.props.selectedClientId,
                isLoading: this.props.isLoadingClients,

                //updateItems: this.updateOrders,
                updateSelectedItem: this.props.updateSelectedClient,
                updateItems: () => { console.log("Update client items...") },

                filterItems: this.filterClients,
                filterBoxProps: {
                    placeholderText: "Search...",
                    contextOptions: [
                        { name: 'propertiesHeader', display: 'Properties', header:true },
                        { name: 'org_nr', display: 'Org. nr' },
                    ]   
                }
            }
        }

        getPageNavProps(){
            const { match } = this.props
            return {
                pageLinks: [ 
                    { title: "My clients page", props: { to: `${match.url}`, tag: Link }, strong: true },
                ]
            }
        }

        render(){
            const pageNavbarProps = this.getPageNavProps()
            const masterPaneProps = this.getMasterPaneProps()
            const { selectedClient, match } = this.props

            return (
                <div>
                    <PageSubNavbar {...pageNavbarProps}>
                        <ClientCreateInlineForm onSuccess={ this.props.loadClients } />
                    </PageSubNavbar>

                    {/* CLIENTS - INDEX */}
                    <Route exact path={`${match.url}`} render={ routeProps => (
                        <WrappedComponent {...this.props} fluid={true}>
                            <MasterPane {...masterPaneProps}>
                                <ClientsMasterList />
                            </MasterPane>
                            <DetailPane>
                            { selectedClient ? (
                                <ClientDetailPane client={selectedClient} />
                            ) : (
                                <EmptyDetailPane>
                                </EmptyDetailPane>
                            ) }
                            </DetailPane>
                        </WrappedComponent>
                    )} />

                    
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        clients: getDenormalizedClients(state),
        selectedClientId: state.ui.clients.selectedClientId,
        selectedClient: getSelectedClientUI(state),
        isLoadingClients: isLoadingClients(state)
    }
}

function mapDispatchToProps(dispatch){
    return {
        loadClients: clientId => dispatch(loadClientsAction({ clientId })),
        updateSelectedClient: e => dispatch(updateClientsMasterListItemIdAction(e.currentTarget.dataset.id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        clientsPageHOC(Page)
    )
)