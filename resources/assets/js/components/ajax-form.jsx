import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AjaxForm extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    handleSubmit(e) {
        if(this.props.onSubmitForm){
            this.props.onSubmitForm(e);
        }
        else {
            e.preventDefault();
            console.log("AjaxForm: No submit handler, default behaviour executed.")
        }

        let data = $('#'+this.props.id).serialize();
        let url = (this.props.url) ? this.props.url : '/';
        let method = (this.props.method) ? this.props.method : 'get';

        console.log("Sending ajax request with data: ");
        console.log(data);
        $.ajax({
            type: method,
            url: url,
            data: data,
            dataType: 'json',
            success: data => {
              console.log("Ajax success: ");
              console.log(data);
            },
            error: data => {
              var errors = data.responseJSON;
              console.log("Ajax error: ");
              console.log(errors);
            }
          });
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