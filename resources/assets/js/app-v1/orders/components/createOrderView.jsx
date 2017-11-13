import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import { Form, Text, FormField } from 'react-form'

import {clientsFetchAll} from '../../clients/actions'
import {getDenormalizedClients} from '../../clients/selectors'

class SelectWrapper extends React.Component {
    render() {
        const {fieldApi, options, ...rest} = this.props
        const {
            getValue, getError, getWarning, getSuccess,
            setValue, setTouched
        } = fieldApi

        return(
            <div>
                <Select 
                    value={getValue()}
                    onChange={(e) => {
                        setValue(e ? e.value : e)
                    }}
                    options={options}
                    {...rest} />
            </div>
        )
    }
}
const SelectField = FormField(SelectWrapper)


/**-------------------------------------------------
 * Create Order view (/orders/create)
 * -------------------------------------------------
 * 
 * @todo Store form-state in localstorage/redux *if* the 
 * form is not set to "submitted = true", so that the
 * user can return to the page, and continue filling
 * fields.
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
        console.log("FORM SUBMITTED")
        console.log(e)
    }
    render(){
        // Map the clients to the Select required format (value - label)
        const clientOptions = this.props.clients.map( client => {
            return { value: client.id, label: client.name }
        })
        // FIXME: Fetch api
        const users = [
            { value: 1, label: "Øyvind Andersson"},
            { value: 2, label: "Gianni Rebaudo"},
            { value: 3, label: "Stinni Atlason"}
        ]

        return(
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-6">
                    <Form onSubmit={this.handleSubmit}>
                    { formApi => (
                        <form onSubmit={formApi.submitForm}>
                            <div className="form-group">
                                <label htmlFor="clientInput">Client</label>
                                <SelectField 
                                    field="order.client" 
                                    id="clientInput" 
                                    options={clientOptions}
                                    required />

                                <label htmlFor="userInput">Registrar</label>
                                <SelectField 
                                    field="order.user_id" 
                                    id="userInput"
                                    options={users}
                                    required />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary" type="submit">Lagre</button>
                            </div>
                        </form>
                    )}
                    </Form>
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