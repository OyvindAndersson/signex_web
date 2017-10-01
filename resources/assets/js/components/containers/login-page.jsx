import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../actions/authActions'

@connect((store) => {
    return {
        user: store.auth.user,
        error: store.auth.error,
        authenticated: store.auth.authenticated
    };
})
export default class LoginPage extends Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            email: "",
            password: ""
        }
    }
    
    doLogin() {
        this.props.dispatch(loginUser(this.state.email, this.state.password));
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }
    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if(this.props.authenticated){
            return(
                <Redirect to={from}/>
            );
        }

        return(
            <div>
                <h3>Login</h3>
                <input id="email" type="email" className="form-control" name="email" 
                    onChange={this.handleInputChange} 
                    value={this.state.email}
                    required autoFocus/>

                <input id="password" type="password" className="form-control" name="password" 
                    onChange={this.handleInputChange} 
                    value={this.state.password} 
                    required/>
                <button onClick={this.doLogin.bind(this)}>Login</button>
            </div>
        );
    }
}