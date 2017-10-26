import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {clientsFetchAll} from '../actions'
import FilterableSelectBox from './filterableSelectBox'

class ClientsPage extends React.Component {
    componentWillMount(){
        let {dispatch} = this.props

        dispatch(clientsFetchAll())
    }
    componentDidCatch(error, info) {
        console.log(error)
    }
    render(){
        const testData = {

        }

        return (
            
            <div>
                <h1>Clients page</h1>
                <FilterableSelectBox />
            </div>
        )
    }
}

export default withRouter(connect( state => ({}))(ClientsPage))