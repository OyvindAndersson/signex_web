import React from 'react'
import { Container, Row, Col } from 'reactstrap'
export default class Authenticating extends React.Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col />
                    <Col>
                        <h5 className="text-center">Logging in...</h5>
                    </Col>
                    <Col />
                </Row>
            </Container>
        )
    }
}