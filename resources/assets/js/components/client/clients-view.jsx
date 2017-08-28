import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AjaxForm from '../ajax-form';

export default class ClientsView extends Component {
    constructor(props){
        super(props);

        this.onClientNameChanged = this.onClientNameChanged.bind(this);
        this.onClientOrgNrChanged = this.onClientOrgNrChanged.bind(this);
        
        this.state = {
            clientName: "",
            clientOrgNr: "",
            clients: []
        }
    }

    onClientNameChanged(e){
        this.setState({ clientName: e.target.value });
    }

    onClientOrgNrChanged(e){
        this.setState({ clientOrgNr: e.target.value });
    }

    onSubmitForm(e) {
        e.preventDefault();
    }
    
    componentDidMount() {
        console.log("Fetching clients....");
        fetch('/api/clients')
        .then(response => {
            return response.json();
        })
        .then(clients => {
            this.setState({ clients });
        });
    }
    renderClients() {
        return this.state.clients.map( client => {
            return (
                <li key={client.id}>{client.name} - <em>{client.org_nr}</em></li>
            );
        });
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h1>Clients</h1>

                        <AjaxForm id="client-form" onSubmitForm={this.onSubmitForm} url="/clients" method="post">
                            <input name="name" type="text" value={this.state.clientName} 
                            onChange={this.onClientNameChanged} placeholder="Client name..." className="form-control" />

                            <input name="org_nr" type="text" value={this.state.clientOrgNr} 
                            onChange={this.onClientOrgNrChanged} placeholder="Organization id" className="form-control" />

                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </AjaxForm>

                        <ul>
                            {this.renderClients()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

if(document.getElementById('clients-view-root')){
    ReactDOM.render(<ClientsView />, document.getElementById('clients-view-root'));
}