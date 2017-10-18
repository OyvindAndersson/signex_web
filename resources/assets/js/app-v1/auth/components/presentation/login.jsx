import React from 'react'
import {Container, Row, Col, InputGroup, InputGroupButton, InputGroupAddon, Input, Button } from 'reactstrap'

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
        var {email, password} = this.state
        this.props.authLoginUser({email, password})
    }
    
    render() {
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="6">
                    <h2>Login</h2>
                    <InputGroup>
                        <Input type="text" 
                            name="email" 
                            value={this.state.email} 
                            placeholder="mail@example.com"
                            onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup>
                        <Input type="password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup>
                        <Button block type="submit" color="primary" onClick={this.handleSubmit.bind(this)}>
                            <span>Login</span>
                        </Button>
                    </InputGroup>
                    </Col>
                </Row>
            </Container>
        )
        
    }
}
