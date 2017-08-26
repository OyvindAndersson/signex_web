import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CreateOrderForm extends Component {
    render() {
        return (
        <div className="panel panel-default">
            <div className="panel-heading">Create order</div>

            <div className="panel-body">
            </div>
        </div>
        );
    }
}

if (document.getElementById('create-order-form')) {
    ReactDOM.render(<CreateOrderForm />, document.getElementById('create-order-form'));
}
