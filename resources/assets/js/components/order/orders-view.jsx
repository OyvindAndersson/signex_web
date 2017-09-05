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
        this.handleInputChange = this.handleInputChange.bind(this);

        let due = moment().add(7, 'days').format('YYYY-MM-DD');
        this.state = {
            clients: [],
            selectedClient: "",
            is_quote: true,
            due_at:due
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
    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(target.type);
        console.log(value);

        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();

        const url = signex.ordersPostUrl;
        let data = {
            client_id: parseInt(this.state.selectedClient),
            user_id: signex.user.id,
            is_quote: this.state.is_quote,
            due_at: this.state.due_at
        };

        axios.post(url, data)
        .then(response => {
            if(response.status !== 200){
                console.log("Failed to submit new order.:");
                console.log(response);
            } else {
                toast.success("Order "+response.data.order.code +
                    " for "+response.data.client.name +
                    " added.", {
                        autoClose: 1000*10
                    });
            }
            // on order added handler - if any need
            // clear form fields
            console.log(response);
        })
        .catch(error => {
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

                                <div className="form-group">
                                    <label>Due</label>
                                    <input name="due_at" type="date" className="form-control"
                                        value={this.state.due_at} onChange={this.handleInputChange} />
                                </div>
                                
                            </div>
                            
                            <div className="col-md-12">
                                <div className="checkbox">
                                    <label>
                                        <input name="is_quote" type="checkbox" 
                                        value={this.state.is_quote} 
                                        onChange={this.handleInputChange}/>Is quote
                                    </label>
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