import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CreateOrderForm extends Component {
    constructor(props){
        super(props);
        // Default state
        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.props.url);
        $.post(this.props.url, (data) => {
            alert(data);
        })
    }

    render() {
        return (
        <div className="panel panel-default">
            <div className="panel-heading">Create order</div>

            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <label>Hello friend</label>
                    <input className="form-control" type="text" value="" />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        );
    }
}

if (document.getElementById('create-order-form')) {
    ReactDOM.render(<CreateOrderForm />, document.getElementById('create-order-form'));
}
