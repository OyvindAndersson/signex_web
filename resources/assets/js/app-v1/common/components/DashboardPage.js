import React from 'react'
import {Route, Link, Redirect, Switch, withRouter} from 'react-router-dom'
import {
    Nav, NavItem, NavLink, Container, Row, Col,
    Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle
} from 'reactstrap'

/**
 * Debug component - test subnav links
 */
class QuickStats extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loaded: false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({loaded: true})
    }
    render(){
        const {user} = this.props
        if(!user){
            return null
        }
        return(
            <section>
            <h4>Stats</h4>
            <Card>
                <CardBody>
                    <CardTitle>{user.name}</CardTitle>
                    <CardSubtitle>{user.email}</CardSubtitle>
                </CardBody>
                <CardBody>
                    <CardText>
                        Registered at: {user.created_at}<br />
                        Id: {user.id}
                    </CardText>
                </CardBody>
            </Card>
        </section>
        )
    }
}

export default class LandingPage extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const {match, user} = this.props

        return(
            <div>
                <Nav>
                <NavItem>
                    <NavLink><strong>Dashboard</strong></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={`${match.url}/quick-stats`}>Quick stats</NavLink>
                </NavItem>
                </Nav>
                <hr />

                <Container>
                    <Row>
                        <Col md="12" lg="6">
                        <Route path={`${match.url}`} render={() => (
                            <p>Some general info that is always displayed on the dashboard parent route</p>
                        )} />
                
                        </Col>
                        <Col md="12" lg="6">
                            <Route path={`${match.url}/quick-stats`} 
                                render={routeProps => {
                                    return(
                                        <div>
                                            <h2>QUICK STATS</h2>
                                            <Route path={`${match.url}/foo`} 
                                                render={routeProps => {
                                                    return(
                                                        <div>
                                                            <h2>FOO</h2>
                                                        </div>
                                                    )
                                                }} />
                                        </div>
                                    )
                                }} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}