import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'

import {clientsFetchAll} from '../../clients/actions'
import {getDenormalizedClients} from '../../clients/selectors'

/**-------------------------------------------------
 * Create Order view (/orders/create)
 * -------------------------------------------------
 * 
 */
class CreateOrderView extends React.Component {
    constructor(props) {
        super(props)

        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            'order[client_id': 0,
            'order[user_id]': 0,
            user: null
        }
    }
    componentDidMount(){
        this.props.dispatch(clientsFetchAll())
    }
    componentWillReceiveProps(next){
        if(next.user !== this.state.user){
            this.setState({ 'order[user_id]': next.user.id, user: next.user})
        }
    }
    handleSelectChange(val){
        this.setState({
            selectedClientId: val
        })
    }
    handleInputChange(e){
        const targe = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            name: value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        /*
        e.preventDefault()
        e.persist()
        console.log(e)
        for(var i = 0; i < e.target.length; i++){
            console.log(e.target[i].defaultValue, e.target[i].name)
        }*/
    }
    render(){
        // Map the clients to the Select required format (value - label)
        const clientOptions = this.props.clients.map( client => {
            return { value: client.id, label: client.name }
        })

        return(
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="clientInput">Client</label>
                            <Select 
                                name="order[client_id]"
                                value={this.state.selectedClientId} 
                                options={clientOptions}
                                onChange={this.handleSelectChange}
                                required={true}
                            />
                         </div>
                        <div className="form-group">
                            <label htmlFor="userInput">Registrar</label>
                            <input 
                                name="order[user_id]"
                                type="text" 
                                className="form-control" 
                                id="userInput" 
                                value={this.state['order[user_id]']}
                                onChange={this.handleInputChange}
                                placeholder="Another input"
                                required />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Lagre</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default connect( state => ({
    clients: getDenormalizedClients(state),
    user: state.auth.user
}))(CreateOrderView)