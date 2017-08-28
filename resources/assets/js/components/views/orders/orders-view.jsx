import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
                    <div className="col-md-8 col-md-offset-2">
                        <h1>Orders</h1>
                        <ul>
                            {this.renderOrders()}
                        </ul>
                    </div>

                    <div className="col-md-8 col-md-offset-2">
                        <ClientCreateForm />
                    </div>
                </div>
            </div>
        );
    }
}

export class ClientCreateForm extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.state = {
            clients: [],
            selectedClient: ""
        };
    }

    componentDidMount(){
        fetch('/api/clients')
        .then(response => { 
            return response.json(); 
        })
        .then(clients => {
            this.setState({ clients });
        });
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
            <div className="col-md-6">
                <h4>Create order</h4>
                <form onSubmit={this.handleSubmit}>
                    <select className="form-control" 
                        onChange={this.handleSelectChange} 
                        value={this.state.selectedClient}>
                        <option value="0">Select...</option>
                        {this.renderClientList()}
                    </select>

                    <input name="user_id" 
                    type="hidden" 
                    className="form-control" 
                    value={signex.user.id} />

                    Is quote
                    <input name="is_quote" type="checkbox" className="form-control" />
                    

                    <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
            </div>
        );
    }
}


if (document.getElementById('orders-view-root')) {
    ReactDOM.render(<OrdersView />, document.getElementById('orders-view-root'));
}