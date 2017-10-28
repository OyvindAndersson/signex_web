import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Nav, NavLink, NavItem, Collapse, Button } from 'reactstrap'
import {clientsFetchAll} from '../actions'
import FilterableSelectBox from './filterableSelectBox'
import {denormalize, schema} from 'normalizr'

/**-------------------------------------------------
 * Master items list
 * -------------------------------------------------
 * Takes the "links"/items for a master/detail page
 * list. 
 * 
 * @todo Make this a ClientMAsterItemList class, which churns the data down to
 * a generic list, usable in a MasterItemList component...?
 */
class MasterItemList extends React.Component {
    constructor(props){
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            items: props.items,
            collapsed: false
        }
    }
    componentWillReceiveProps(props){
        this.setState({ items: props.items })
    }
    toggle(){
        this.setState({ collapsed: !this.state.collapsed})
    }
    render() {
        return (
            <div>
            <Button className="d-block d-sm-none w-100" 
                color="primary" 
                onClick={this.toggle} 
                style={{ marginBottom: '1rem' }}>
                Hide / Show list
            </Button>
            <Collapse isOpen={!this.state.collapsed} >
                {React.cloneElement(React.Children.only(this.props.children), {...this.props})}
            </Collapse>
            </div>
        )
    }
}

/**-------------------------------------------------
 * Clients Item List
 * -------------------------------------------------
 * Item list for Clients models. Passed as only child
 * to MasterItemList
 */
class ClientsItemList extends React.Component {
    render(){
        const {items} = this.props
        const renderItems = items.map( item => {
            return (<ClientItemListLink key={item.id} data={item} />)
        })

        return (
            <div className="list-group" >
                {renderItems}
            </div>
        )
    }
}

/**-------------------------------------------------
 * Client Item List Link
 * -------------------------------------------------
 * List link (item) for Clients item list display.
 */
class ClientItemListLink extends React.Component {
    render(){
        const client = this.props.data
        const name = client.name.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
        return(
            <a href="#" className="list-group-item list-group-item-action">
                <h6>{name}</h6>
                <small>{client.org_nr}</small>
            </a>
        )
    }
}

/**-------------------------------------------------
 * Clients page root
 * -------------------------------------------------
 * 
 */
class ClientsPage extends React.Component {
    constructor(props){
        super(props)

        this.handleClientCreateForm = this.handleClientCreateForm.bind(this)
        this.handleInputChanged = this.handleInputChanged.bind(this)
        this.state = {
            clientName: "",
            clientOrgNr: ""
        }
    }
    componentWillMount(){
        let {dispatch} = this.props

        dispatch(clientsFetchAll())
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
    handleClientCreateForm(e){
        e.preventDefault()

        // DEBUG, inline post request
        // TODO: move to api.js / actions

        axios.post("api/clients/create", {
            name: this.state.clientName,
            org_nr: this.state.clientOrgNr
        }, { headers: { authorization:`Bearer`+localStorage.getItem('token') }})
        .then( resp => {
            console.log(resp)
        }).catch(err => {
            console.log(err)
        })
    }
    render(){
        const clientsArray = Object.keys(this.props.clients).map( key => {
            return this.props.clients[key]
        })

        return (
            
            <div>
                <Nav>
                    <NavItem>
                        <NavLink><strong>Clients</strong></NavLink>
                    </NavItem>
                </Nav>
                <hr />

                <div className="container-fluid">
                    {/* Master detail */}
                    <div className="row">
                        {/* Master */}
                        <div className="col-sm-5 col-md-4 col-lg-3">
                            <div id="master-pane">
                            <FilterableSelectBox />
                            <MasterItemList items={clientsArray} itemComponent={ClientItemListLink}>
                                <ClientsItemList />
                            </MasterItemList>
                            </div>
                        </div>

                        {/* Detail */}
                        <div className="col">
                            <div id="detail-pane">
                                <form onSubmit={this.handleClientCreateForm}>
                                    <input type="text" name="clientName" onChange={this.handleInputChanged} placeholder="Client name" />
                                    <input type="text" name="clientOrgNr" onChange={this.handleInputChanged} placeholder="998998998" />
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const theSchema = new schema.Entity('clients')
const rootSchema = {
    clients: theSchema
}

export default withRouter(connect( state => ({
    clients: state.entities.clients.byId
}))(ClientsPage))