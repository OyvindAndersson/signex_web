import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import { Form, Text } from 'react-form'
import moment from 'moment'

import {SelectField, DateTimeField} from '../../utils/react-form-hocs'
import {LabeledFormGroup, FormGroup} from '../../utils/bootstrap'

import {clientsFetchAll} from '../../clients/actions'
import {getDenormalizedClients} from '../../clients/selectors'


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

        // Auto-select the currently authed user as the "our ref" selection.
        const authUserId = this.props.user ? this.props.user.id : null

        const dueAt = moment().add(7, 'days')
        const now = moment()
        
        // FIXME: Fetch api
        const users = [
            { value: 1, label: "Øyvind Andersson"},
            { value: 2, label: "Gianni Rebaudo"},
            { value: 3, label: "Stinni Atlason"}
        ]
        const orderTypes = [
            { value: 1, label: "Misc"},
            { value: 2, label: "Other"},
            { value: 3, label: "Production"}
        ]

        return(
        <div className="col-md-12">
            <Form onSubmit={this.handleSubmit}>
            { formApi => (
            <form onSubmit={formApi.submitForm}>
                <div className="row">
                    {/* Order details*/}
                    <div className="col-md-4">
                        <h5 className="mb-4">Order details</h5>
                        <LabeledFormGroup htmlFor="clientInput" label="Client" rowFormat>
                            <SelectField 
                                field="order.client" 
                                id="clientInput" 
                                options={clientOptions} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="userInput" label="Our ref" rowFormat>
                            <SelectField 
                                field="order.user_id" 
                                id="userInput"
                                options={users}
                                value={authUserId} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="createdAtInput" label="Taken at:" rowFormat>
                            <DateTimeField 
                                field="order.registered_at"
                                id="createdAtInput"
                                defaultValue={now} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="dueAtInput" label="Due at:" rowFormat>
                            <DateTimeField 
                                field="order.due_at"
                                id="dueAtInput"
                                defaultValue={dueAt} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="typeInput" label="Type" rowFormat>
                            <SelectField 
                                field="order.type" 
                                id="typeInput"
                                options={orderTypes}
                                value={1} />
                        </LabeledFormGroup>
                        
                    </div>

                    {/* Products */}
                    <div className="col-md-4">
                        <h5 className="mb-4">Order lines</h5>

                        <LabeledFormGroup htmlFor="orderInput" label="Taken at:" rowFormat>
                            <DateTimeField 
                                field="order.lines.0.date"
                                id="orderInput"
                                defaultValue={now} />
                        </LabeledFormGroup>
                    </div>

                    {/* Tasks */}
                    <div className="col-md-4">
                        <h5 className="mb-4">Order tasks</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup>
                            <button className="btn btn-primary" type="submit">Lagre</button>
                        </FormGroup>
                    </div>
                </div>
            </form>
            )}
            </Form>
        </div>
        )
    }
}

export default connect( state => ({
    clients: getDenormalizedClients(state),
    user: state.auth.user
}))(CreateOrderView)