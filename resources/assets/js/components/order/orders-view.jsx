import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ClientForm } from '../client/clients-view';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

/**
 * @todo add Order inputs to form (fix due_at!!) and add project form within after.
 */

export default class OrdersView extends Component {
    constructor(props){
        super(props);

        this.state = {
            orders: []
        }
    }

    componentDidMount(){
        this.updateOrders();
    }

    updateOrders() {
        fetch('/api/orders')
        .then(response => {
            return response.json();
        })
        .then(response => {
            this.setState({ orders: response })
        });
    }

    renderOrders() {
        return this.state.orders.map( order => {
            return (
                <li key={order.id}>{order.id} - Due: {order.due_at}</li>
            );
        });
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Orders</h1>
                    </div>

                    <div className="col-md-12">
                        <OrderCreateForm />
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

export class OrderCreateForm extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.updateClientList = this.updateClientList.bind(this);
        this.onClientAddedHandler = this.onClientAddedHandler.bind(this);

        this.state = {
            clients: [],
            selectedClient: ""
        };
    }
    componentDidMount(){
        this.updateClientList();
    }
    updateClientList(){
        fetch('/api/clients')
        .then(response => { 
            if(response.status !== 200){
                console.log("Error while fetching clients: " + response.status);
                toast.error("Failed to fetch clientlist!", {autoClose: 6000});
                return response;
            }
            return response.json(); 
        })
        .then(clients => {
            this.setState({ clients });
        });
    }
    onClientAddedHandler(newClient){
        this.updateClientList();
        
        toast.success("Client '"+newClient.name+"' added");
    }
    handleSubmit(event) {
        event.preventDefault();

        let now = new Date();
        now.setDate(now.getDate() + 14);

        const url = signex.ordersPostUrl;
        let data = {
            client_id: parseInt(this.state.selectedClient),
            user_id: signex.user.id,
            is_quote: 0,
            due_at: now.toISOString().substring(0, 10)
        };
        console.log("Sending: ");
        console.log(data);
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            success: data => {
              alert(data);
            },
            error: data => {
              var errors = data.responseJSON;
              console.log(errors);
            }
          });
    }
    handleSelectChange(event) {
        this.setState({ selectedClient: event.target.value });
    }
    renderClientList() {
        return this.state.clients.map( client => {
            return (
                <option key={client.id} value={client.id}>{client.name}</option>
            );
        });
    }
    render() {
        return(
            <div className="row">
                <div className="col-md-6">
                    <h4>Create order</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Client:</label>
                                    <select className="form-control" 
                                        onChange={this.handleSelectChange} 
                                        value={this.state.selectedClient}>
                                        <option value="0">Select...</option>
                                        {this.renderClientList()}
                                    </select>
                                </div>

                                <input name="user_id" 
                                    type="hidden" 
                                    className="form-control" 
                                    value={signex.user.id} />

                                <input name="due_at" type="date" className="form-control"
                                    value={moment().format('YYYY-MM-DD h:mm:ss')} />
                                
                            </div>
                            
                            <div className="col-md-12">
                                <div className="checkbox">
                                    <label><input name="is_quote" type="checkbox" value=""/>Is quote</label>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </div>
                            
                        </div>
                    </form>
                </div>

                <div className="col-md-6">
                    <div className="jumbotron">
                        <h3>New client form</h3>
                        <ClientForm onClientAddedHandler={this.onClientAddedHandler} />
                    </div>
                </div>
            </div>
        );
    }
}


if (document.getElementById('orders-view-root')) {
    ReactDOM.render(<OrdersView />, document.getElementById('orders-view-root'));
}