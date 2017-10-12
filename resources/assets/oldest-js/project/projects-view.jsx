import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ClientForm } from '../client/clients-view';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import CreateOrderProjectForm from '../order/create-order-project-form';

export default class ProjectsView extends Component {
    constructor(props){
        super(props);

        this.state = {
            orders: signex.orders,
            clients: signex.clients
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Projects</h1>
                    </div>

                    <div className="col-md-12">
                        <CreateOrderProjectForm />
                    </div>

                    <div className="col-md-12">
                        <ProjectCreateForm orders={this.state.orders} />
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

export class OrderList extends Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            orders: props.orders
        }
    }

    getClientById(id){
        fetch("/client", { id: id})
        .then(response => { alert(response); })
        .catch(error => {});
    }

    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(target.type);
        console.log(value);

        this.setState({ [name]: value });
    }

    componentWillReceiveProps(props){
        this.setState({orders: props.orders});
    }
    render(){

        const orders = (this.state.orders) ? this.state.orders.map(order => {
                return(
                    <option key={order.id} value={order.id}>
                        {order.code + ' ['+order.client.name+']'}
                    </option>
                );
            }) : [];

        return (
            <select name="order_id" className="form-control" 
                value={this.state.selected} 
                onChange={this.handleInputChange}>
                <option key="0" value="0">Select...</option>
                {orders}
            </select>
        );
    }
}

export class ProjectCreateForm extends Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            body: ""
        }
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();

        const url = signex.projectsPostUrl;
        // Parse all form data
        let formData = $(event.target).serializeArray();
        var data = {};
        // map array to object for axios params
        formData.map( obj => {
            return data[obj.name] = obj.value;
        });

        console.log(data);

        axios.post(url, data)
        .then(response => {
            if(response.status !== 200){
                console.log("Failed to submit new project.:");
                console.log(response);
            } else {
                toast.success("Project "+response.data.project.code+
                              " for order " + response.data.order.code + " added.", {
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

    render(){
        return (
            <div className="row">
                <div className="col-md-6">
                    <h4>Create project</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">

                                <input name="manager_id" type="hidden" value={''+signex.user.id} />

                                <div className="form-group">
                                    <label>Attach to order</label>
                                    <OrderList orders={this.props.orders} />
                                </div>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input name="name" className="form-control"
                                        value={this.state.name}  
                                        onChange={this.handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea name="body" className="form-control"
                                        value={this.state.body}  
                                        onChange={this.handleInputChange} />
                                </div>

                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

if(document.getElementById('projects-view-root')) {
    ReactDOM.render(<ProjectsView />, document.getElementById('projects-view-root'));
}