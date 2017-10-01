import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ClientForm } from '../client/clients-view';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

/**
 * Container View of creating an order, with a project and products.
 */
export default class CreateOrderProjectView extends Component {
    render() {
        return(
            <div>
                <div className="col-md-8 col-md-offset-2">
                <CreateOrderProjectForm />
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
 * Form container for submitting Order and Project input
 */
export class CreateOrderProjectForm extends Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        // Parse all form data
        let formData = $(event.target).serializeArray();
        var data = {};
        // map array to object for axios params
        formData.map( obj => {
            return data[obj.name] = obj.value;
        });

        console.log(data);

        axios.post("/orderWithProject", data)
        .then(response => {
            if(response.status !== 200){
                console.log("Failed to submit new project.:");
                console.log(response);
            } else {
                let y = '';
                for(let x in response.data.data){
                    y += x + ', ';
                }
                toast.info(y);
                /*
                toast.success("New order "+response.data.order.code+
                              " with project " + response.data.project.code + " added.", {
                                  autoClose: 1000*10
                              });*/
            }
        })
        .catch(error => {
            /** @todo Display laravel errors with dedicated component */
            /*
            let errors = error.response.data.errors;
            if(errors){
                for(let key in errors){
                    toast.error(errors[key][0], {autoClose: 5000});
                }
            }*/
            console.log(error);
        });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <OrderFormInputs />
                    </div>
                    <div className="col-md-6">
                        <ProductCollectionFormInputs />
                    </div>
                    <div className="col-md-12">
                        <ProjectFormInputs />
                    </div>
                </div>
                <Input type="submit" className="btn btn-primary" />
            </form>
        );
    }
}

/*----------------------------------------------------------------
*  INPUTS
*----------------------------------------------------------------*/
export function Input(props) {
    const {label} = props;
    return(
        <div className="form-group">
            <label>{label}</label>
            <input {...props} className={props.className + ' form-control'} />
        </div>
    );
}

export function CheckBox(props){
    const {label} = props;
    return(
            <div className="checkbox">
                <label>
                <input type="checkbox" {...props} className={props.className} />
                {label}
                </label>
            </div>
    );
}

/**
 * Form inputs for an Order
 */
export class OrderFormInputs extends Component {
    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            dueAt: moment().add(7, 'days').format('YYYY-MM-DD'),
            clientId: 0,
            statusId: 1, // Todo: Get enum of order statuses
            isQuote: false,
            quoteExpiresAt: moment().add(20, 'days').format('YYYY-MM-DD'),
            clients: props.clients ? props.clients : [{id: 0, name: "Select..."}]
        }
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }
    render() {
        const clientList = this.state.clients.map(client => {
            return (<option key={client.id} value={client.id}>{client.name}</option>);
        });
        return(
            <div>
                <h4>Order</h4>
                <label>Client</label>
                <select name="order[client_id]" className="form-control"
                    value={this.state.clientId} onChange={this.handleInputChange}>
                    {clientList}
                </select>
                <Input name="order[due_at]" label="Due" value={this.state.dueAt} 
                    onChange={this.handleInputChange} />
                <Input name="order[user_id]" type="hidden" readOnly value={signex.user.id} />
                <Input name="order[status_id]" label="Status" value={this.state.statusId} 
                    onChange={this.handleInputChange} />
                <CheckBox name="order[is_quote]" label="Is Quote?" value={this.state.isQuote} 
                    onChange={this.handleInputChange} />
                {this.state.isQuote ? (
                <Input name="order[quote_expires_at]" label="Is Quote?" value={this.state.isQuote} 
                    onChange={this.handleInputChange} />
                ) : ''}

            </div>
        );
    }
} 

/**
 * Form inputs for a Project
 */
export class ProjectFormInputs extends Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            name: '',
            body: '',
            managerId: 0,
            orderId: 0
        }
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }
    render() {
        return(
            <div>
                <h4>Project</h4>
                <Input label="Tag" name="project[name]" value={this.state.name} onChange={this.handleInputChange} />
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" name="project[body]" value={this.state.body} onChange={this.handleInputChange} />
                </div>
                <Input label="Manager" name="project[manager_id]" value={this.state.managerId} onChange={this.handleInputChange} />

            </div>
        );
    }
}

/**
 * Form inputs for a ProductCollection - attached to an Order.
 * Use inside of a Order form input container.
 */
export class ProductCollectionFormInputs extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h4>Product collection</h4>
            </div>
        );
    }
}

if(document.getElementById('project-create-view-root')){
    ReactDOM.render(<CreateOrderProjectView />, document.getElementById('project-create-view-root'));
}