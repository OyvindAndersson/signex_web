import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ClientForm } from '../client/clients-view';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

export default class ProjectsView extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Projects</h1>
                    </div>

                    <div className="col-md-12">
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
        this.state = {
            orders: props.orders
        }
    }

    componentWillReceiveProps(props){
        this.setState({orders: props.orders});
    }
    render(){

        const orders = this.state.orders.map(order => {
            return(
                <option key={order.id} value={order.id}>{order.id} - {/* Also show order client */}</option>
            );
        });

        return (
            <select>
                {this.props.children}
            </select>
        );
    }
}

export class ProjectCreateForm extends Component {
    constructor(props){
        super(props);

        this.handleOrderChanged = this.handleOrderChanged.bind(this);
        this.state = {

        }
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

        const url = signex.projectsPostUrl;
        let data = {
        };

        axios.post(url, data)
        .then(response => {
            if(response.status !== 200){
                console.log("Failed to submit new project.:");
                console.log(response);
            } else {
                toast.success("Successfully added project id:"+response.data.project.id);
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

    handleOrderChanged(e){

    }

    render(){
        return (
            <div className="row">
                <div className="col-md-6">
                    <h4>Create order</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="form-group">
                                    <label>Attach to order</label>
                                    <OrderList onChange={this.handleOrderChanged} />
                                </div>

                                <div className="form-group">
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

if (document.getElementById('projects-view-root')) {
    ReactDOM.render(<ProjectsView />, document.getElementById('projects-view-root'));
}