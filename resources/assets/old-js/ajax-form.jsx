import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AjaxForm extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        if(this.props.onSubmitForm){
            this.props.onSubmitForm(e);
        }
        else {
            e.preventDefault();
            console.log("AjaxForm: No submit handler, default behaviour executed.")
        }
    }

    render() {
        const id = (this.props.id) ? this.props.id : "form_1";
        return (
            <form id={id} onSubmit={this.handleSubmit}>
                {this.props.children}
            </form>
        );
    }
}