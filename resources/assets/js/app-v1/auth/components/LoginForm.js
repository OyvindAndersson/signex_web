import React from 'react'
import PropTypes from 'prop-types'

/**
 * Presentational part of the login page, taking care
 * of form and action
 */
export default class LoginForm extends React.Component {
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        e.preventDefault()
        
        var {email, password} = this.state
        this.props.authLoginUser({email, password})
    }
    
    render() {
        const {isVerifyingLogin} = this.props
        return(
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-6 col-lg-4">

                        <div className="card">
                         <img className="card-img-top" 
                            src="https://stormideaswus.blob.core.windows.net/headerjunction/2014/91/6d2380c6-00e3-4f58-a911-c8aa98afa460.jpg" 
                            alt="Card image cap" />
                            {isVerifyingLogin ? (
                                <div className="progress">
                                    <div 
                                        className="progress-bar progress-bar-striped progress-bar-animated bg-warning" 
                                        role="progressbar" 
                                        aria-valuenow="100" 
                                        aria-valuemin="0" 
                                        aria-valuemax="100" 
                                        style={{width: 100+"%"}}>
                                    </div>
                                </div>
                                ) : null }
                            <div className="card-body">
                                <h4 className="card-title">Login</h4>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail">Email address</label>
                                        <input type="email" 
                                            className="form-control form-control-lg" 
                                            id="inputEmail" 
                                            name="email"
                                            value={this.state.email} 
                                            onChange={this.handleChange}
                                            aria-describedby="emailHelp" 
                                            placeholder="Enter email" />
                                        <small id="emailHelp" className="form-text text-muted">
                                            We'll never share your email with anyone else.
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Password</label>
                                        <input type="password" 
                                            className="form-control form-control-lg" 
                                            id="inputPassword" 
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            placeholder="Password" />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}
LoginForm.propTypes = {
    authLoginUser: PropTypes.func.isRequired
}
