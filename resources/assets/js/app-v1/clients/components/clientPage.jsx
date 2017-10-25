import React from 'react'
import { connect } from 'react-redux'
import {clientsFetchAll} from '../actions'

class ClientsPage extends React.Component {
    componentDidMount(){
        let {dispatch} = this.props

        dispatch(clientsFetchAll())
    }
    componentDidCatch(error, info) {
        console.log(error)
    }
    render(){
        return (
            <div>
                <h1>Clients page</h1>
            </div>
        )
    }
}

export default connect( state => ({}))(ClientsPage)