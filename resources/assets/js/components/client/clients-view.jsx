import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AjaxForm from '../ajax-form';
import Brreg from '../../brreg.js';

/*
* @TODO: 28.08.17 ClientsTable -> component-rows, able to inline-delete/edit/save
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
                    <div className="col-md-4">
                        <h4>Create client</h4>
                        <ClientForm onClientAddedHandler={this.onClientAdded} />
                    </div>
                    <div className="col-md-12">
                        <ClientsTable clients={this.state.clients} />
                    </div>
                </div>
            </div>
        );
    }
}

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

export class ClientForm extends Component {
    constructor(props){
        super(props);

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onClientNameChanged = this.onClientNameChanged.bind(this);
        this.onClientOrgNrChanged = this.onClientOrgNrChanged.bind(this);

        this.state = {
            clientName: '',
            clientOrgNr: ''
        }
    }

    onClientNameChanged(e){
        this.setState({ clientName: e.target.value });
        (new Brreg()).searchByName(e.target.value);
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
            alert("Error!: Submission failed. See log.");
            console.log("Error axios: " + error);
        })
    }

    render() {
        const url = this.props.url ? this.props.url : "/clients";
        const method = this.props.method ? this.props.method : "post";
        return(
        <AjaxForm  onSubmitForm={this.onSubmitForm} url={url} method={method}>
            <div className="form-group">
                <input name="name" type="text" 
                    value={this.state.clientName} 
                    onChange={this.onClientNameChanged} 
                    placeholder="Client name..." 
                    className="form-control" />
            </div>

            <div className="form-group">
                <input name="org_nr" type="text" 
                    value={this.state.clientOrgNr} 
                    onChange={this.onClientOrgNrChanged} 
                    placeholder="Organization id" 
                    className="form-control" />
            </div>

            <input type="submit" value="Submit" className="btn btn-primary" />
        </AjaxForm>
        );
    }
}

if(document.getElementById('clients-view-root')){
    ReactDOM.render(<ClientsView />, document.getElementById('clients-view-root'));
}