import React from 'react'
import {Container, Row, Col} from 'reactstrap'

export default class PageWrapper extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Container className={this.props.className}>
                <Row>
                    <Col>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        );
    }
}