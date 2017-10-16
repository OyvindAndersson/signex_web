import React from 'react'
import { authLoginUser } from '../../actions'


/**
 * Presentational part of the login page, taking care
 * of form and action
 */
export default class Login extends React.Component {
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.state = {
            email: "",
            password: ""
        }
    }
    handleChange(e){
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value
        })
    }
    handleSubmit(e){
        var {dispatch} = this.props
        var {email, password} = this.state
        dispatch(authLoginUser({email, password}))
    }
    
    render() {
        return(
            <div>
                <h2>Login</h2>
                <input type="text" 
                    name="email" 
                    value={this.state.email} 
                    placeholder="mail@example.com"
                    onChange={this.handleChange} />

                <input type="password" 
                    name="password" 
                    value={this.state.password}
                    onChange={this.handleChange} />

                <button type="submit" onClick={this.handleSubmit.bind(this)}>Login</button>
            </div>
        )
        
    }
}
