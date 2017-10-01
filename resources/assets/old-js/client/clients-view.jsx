import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AjaxForm from '../ajax-form';
import Brreg from 'brreg';

import { ToastContainer, toast } from 'react-toastify';

/**
 * Main view component. Parent for entire "Clients" view.
 */
export default class ClientsView extends Component {
    constructor(props){
        super(props);

        this.onClientAdded = this.onClientAdded.bind(this);

        this.state = {
            clients: []
        }
    }
    
    componentDidMount() {
        this.serverRequest = axios.get('/api/clients')
        .then( response => {
            this.setState({clients: response.data});
        });
    }

    componentWillUnmount(){
        this.serverRequest.abort();
    }

    onClientAdded(client) {
        if(client){
            let newClients = this.state.clients.slice();
            newClients.push(client);
            this.setState({
                clients: newClients
            });
        }
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Clients</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Create client</h4>
                        <ClientForm onClientAddedHandler={this.onClientAdded} />
                    </div>
                    <div className="col-md-12">
                        <ClientsTable clients={this.state.clients} />
                    </div>
                </div>
                <ToastContainer 
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                    />
            </div>
        );
    }
}

/**
 * Table for displaying all client data.
 * @todo Pagination
 */
export class ClientsTable extends Component {
    constructor(props){
        super(props);

        this.state = {
            clients: props.clients
        }
    }

    componentWillReceiveProps(props){
        this.setState({clients: props.clients});
    }

    renderClientRows() {
        
        return this.state.clients.map( client => {
            return (
                <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.org_nr}</td>
                </tr>
            );
        });
    }

    render() {

        const rows = this.state.clients.map( client => {
            return <ClientTableRow key={client.id} client={client} />;
        });

        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Organization's number</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

/**
 * Row component used for ClientsTable component.
 */
export class ClientTableRow extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
        <tr key={this.props.client.id}>
            <td>{this.props.client.id}</td>
            <td>{this.props.client.name}</td>
            <td>{this.props.client.org_nr}</td>
            <td>
                <button className="btn btn-xs">Edit</button>
            </td>
        </tr>
        );
    }
}

/**
 * <select> component
 * Callback: selectedChangeCallback (dispatches on <select> onChange event)
 */
export class SelectBox extends Component {
    constructor(props){
        super(props);

        this.onSelectedChange = this.onSelectedChange.bind(this);
        this.selectedChangeCallback = this.props.selectedChangeCallback;
    }

    onSelectedChange(e){
        let selectBox = e.target;
        if(selectBox !== null){
            if(this.selectedChangeCallback){
                this.selectedChangeCallback({
                    value: Array.from(e.target.selectedOptions)
                });
            }
        }
    }
    render() {
        return(
            <select id={this.props.id}
                onChange={this.onSelectedChange}
                className="form-control">
                {this.props.children}
            </select>
        );
    }
}

/**
 * Wraps a SelectBox and can display brreg API objects
 * from a query. Can be integrated with callbacks:
 * onItemResultChanged: dispatches on SelectBox onChange event
 */
export class BrregResultBox extends Component {
    constructor(props){
        super(props);

        this.itemResultChanged = this.itemResultChanged.bind(this);
        this.onItemResultChanged = props.onItemResultChanged;

        this.state = {
            data: []
        };
    }
    componentWillReceiveProps(props){
        this.setState({data: props.data});
    }
    itemResultChanged(result){
        if(result.value.length > 0){

            if(this.onItemResultChanged){
                this.onItemResultChanged({
                    value: result.value[0].value,
                    name: result.value[0].text
                });
            }
        }
        
    }
    render() {
        let len = (this.state.data) ? this.state.data.length : 0;
        const data = (this.state.data) ? this.state.data.slice() : [];
        if(len > 0){
            data.unshift({organisasjonsnummer: "brregSearchBox", navn: len+" treff..."});
        }

        let options = data ? data.map(r => {
            return (<option key={r.organisasjonsnummer} value={r.organisasjonsnummer}>{r.navn}</option>);
        }) : [];
        
        

        return (
            <div>
                <SelectBox id={this.props.id} selectedChangeCallback={this.itemResultChanged}>
                    {options}
                </SelectBox>
            </div>
        );
    }
}

/**
 * Standard client form for creating new clients and persist
 * to the database. 
 * Callbacks:
 *  onClientAddedHandler - Dispatched when a new client is successfully persisted to the database.
 */
export class ClientForm extends Component {
    constructor(props){
        super(props);

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onClientNameChanged = this.onClientNameChanged.bind(this);
        this.onClientOrgNrChanged = this.onClientOrgNrChanged.bind(this);

        this.onBrregSearchResults = this.onBrregSearchResults.bind(this);
        this.onSelectedBrregChange = this.onSelectedBrregChange.bind(this);
        this.onBtnUseBrregDataClick = this.onBtnUseBrregDataClick.bind(this);

        this.state = {
            clientName: '',
            clientOrgNr: '',
            brregResults: [],
            brregSelection: null
        }

        this.brreg = new Brreg(this.onBrregSearchResults);
    }

    onClientNameChanged(e){
        this.brreg.searchByName(e.target.value, 5);
        this.setState({ 
            clientName: e.target.value
        });
    }
    onClientOrgNrChanged(e){
        this.setState({ clientOrgNr: e.target.value });
    }
    onSubmitForm(e) {
        e.preventDefault();
        axios.post('clients', {
            name: this.state.clientName,
            org_nr: this.state.clientOrgNr
        })
        .then(response => {
            // registerable handler for when the client is added.
            // Useful for parent components with client tables
            // that must/could be updated.
            if(this.props.onClientAddedHandler){
                this.props.onClientAddedHandler(response.data);
            }
            // clear form fields
            this.setState({
                clientName: '',
                clientOrgNr: ''
            });
        })
        .catch(error => {
            //alert("Error!: Submission failed. See log.");

            /** @todo Display laravel errors with dedicated component */
            let errors = error.response.data.errors;
            if(errors){
                for(let key in errors){
                    toast.error(errors[key][0], {autoClose: 5000});
                }
            }
            /** @todo Remove (debug) */
            console.log("axios: " + error);
            console.log(error);
        })
    }

    onBrregSearchResults(data){
        this.setState({ brregResults: data });
    }
    onSelectedBrregChange(item){
        if(item){
            this.setState({ brregSelection: item});
        }
    }
    onBtnUseBrregDataClick(){
        const item = this.state.brregSelection;
        if(item){
            this.setState({
                clientName: item.name,
                clientOrgNr: item.value,
                brregResults: [],
                brregSelection: null
            });
        }
    }

    render() {
        const url = this.props.url ? this.props.url : "/clients";
        const method = this.props.method ? this.props.method : "post";

        return(
        <AjaxForm  onSubmitForm={this.onSubmitForm} url={url} method={method}>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <input name="name" type="text" 
                            value={this.state.clientName} 
                            onChange={this.onClientNameChanged} 
                            placeholder="Client name..." 
                            className="form-control" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <input name="org_nr" type="text" 
                            value={this.state.clientOrgNr} 
                            onChange={this.onClientOrgNrChanged} 
                            placeholder="Organization id" 
                            className="form-control" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <BrregResultBox data={this.state.brregResults} 
                            onItemResultChanged={this.onSelectedBrregChange} />
                    </div>
                </div>
                <div className="col-md-4 col-md-offset-8">
                    <div className="form-group">
                        <button onClick={this.onBtnUseBrregDataClick} type="button" 
                            className="btn btn-default form-control">Use selected</button>
                    </div>
                </div>
            </div>
            

            <input type="submit" value="Submit" className="btn btn-primary" />
        </AjaxForm>
        );
    }
}

if(document.getElementById('clients-view-root')){
    ReactDOM.render(<ClientsView />, document.getElementById('clients-view-root'));
}