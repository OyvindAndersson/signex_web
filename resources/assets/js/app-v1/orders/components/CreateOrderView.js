import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {withRouter} from 'react-router-dom'

// presentation
import Select from 'react-select'
import { Form, Text, TextArea } from 'react-form'
import { UncontrolledAlert } from 'reactstrap'
import {SelectField, DateTimeField} from '../../utils/react-form-hocs'
import {LabeledFormGroup, FormGroup} from '../../utils/bootstrap'
import { toast } from 'react-toastify'
import { toastIt } from "../../common/components/toastIt";

// actions and selectors
import {getDenormalizedClients} from 'Clients/selectors'
import {getDenormalizedUsers} from 'Auth/selectors'
import {getOrderErrors, getOrderNotify} from '../selectors'
import { createOrderAction } from "../actions"


/**-------------------------------------------------
 * Create Order view (/orders/create)
 * -------------------------------------------------
 * 
 * @todo Store form-state in localstorage/redux *if* the 
 * form is not set to "submitted = true", so that the
 * user can return to the page, and continue filling
 * fields.
 * 
 * @todo Change current formApi.resetAll() / this.resetAll()
 * functionality to rather inc. react-form's form validation
 * strategies - with that, we have no need for conditionally
 * resetting, we can just reset when the form is submitted
 * with valid validation.
 */
class CreateOrderView extends React.Component {
    constructor(props) {
        super(props)

        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.resetForm = this.resetForm.bind(this)

        this.state = {
            user: null,
            users: [],
            // Form state
            clientInput: 1,
            userInput: props.user ? props.user.id : null,
            statusInput: 1,
            descriptionInput: 'Test',
            createdAtInput: moment(),
            dueAtInput: moment().add(7, 'days'),
            typeInput: 1,

            notify: null
        }
    }
    componentWillReceiveProps(next){
        if(next.user !== this.state.user){
            this.setState({ 
                userInput: next.user.id, 
                user: next.user,
                users: next.users
            })
        }
        if(next.notify){
            this.setState({
                notify: next.notify
            })
            toastIt(next.notify)
            this.resetForm()
        }
    }
    handleSelectChange(val, id){
        this.setState({
            id: val.value
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
    handleSubmit(values, e, formApi){
        // format to MYSQL
        values.order.due_at = moment(values.order.due_at, "DD.MM.Y H:m").format('YYYY-MM-DD HH:MM:SS')

        const { createOrder } = this.props
        createOrder(values)

        // We need a reference to formApi in resetForm(), 
        // which will only ever be called after a submit
        this.formApi = formApi
    }
    resetForm(){
        if(this.formApi){
            this.formApi.resetAll()
        }
    }
    render(){
        // Map the clients to the Select required format (value - label)
        const clientOptions = this.props.clients.map( client => {
            return { value: client.id, label: client.name }
        })
        const userOptions = this.props.users.map( user => {
            return { value: user.id, label: user.name }
        })

        // FIXME: Fetch api
        const orderTypes = [
            { value: 1, label: "Misc"},
            { value: 2, label: "Other"},
            { value: 3, label: "Production"}
        ]

        // FIXME: Fetch api
        const orderStatuses = [
            { value: 1, label: "Quote"},
            { value: 2, label: "Registered"},
            { value: 3, label: "In progress"},
            { value: 4, label: "Finished / Sent"},
            { value: 5, label: "Archived"},
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
                                required={true}
                                field="order.client_id" 
                                id="clientInput" 
                                options={clientOptions}
                                value={this.state.clientInput}
                                onChange={this.handleSelectChange} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="userInput" label="Our ref" rowFormat>
                            <SelectField 
                                field="order.user_id" 
                                id="userInput"
                                options={userOptions}
                                value={this.state.userInput} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="statusInput" label="Status" rowFormat>
                            <SelectField 
                                field="order.status_id" 
                                id="statusInput"
                                options={orderStatuses}
                                value={this.state.statusInput} />
                        </LabeledFormGroup>
                        
                        <LabeledFormGroup htmlFor="descriptionInput" label="Description">
                            <TextArea 
                                id="descriptionInput" 
                                field="order.description"
                                className="form-control">{this.state.descriptionInput}</TextArea>
                        </LabeledFormGroup>

                        <LabeledFormGroup htmlFor="createdAtInput" label="Taken at:" rowFormat>
                            <DateTimeField 
                                field="order.registered_at"
                                id="createdAtInput"
                                defaultValue={this.state.createdAtInput} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="dueAtInput" label="Due at:" rowFormat>
                            <DateTimeField 
                                field="order.due_at"
                                id="dueAtInput"
                                defaultValue={this.state.dueAtInput} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="typeInput" label="Type" rowFormat>
                            <SelectField 
                                field="order.type" 
                                id="typeInput"
                                options={orderTypes}
                                value={this.state.typeInput} />
                        </LabeledFormGroup>
                        
                    </div>

                    {/* Products */}
                    <div className="col-md-4">
                        <h5 className="mb-4">Order lines</h5>
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

const mapStateToProps = state => {
    return {
        clients: getDenormalizedClients(state),
        users: getDenormalizedUsers(state),
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createOrder: data => dispatch(createOrderAction(data))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CreateOrderView)
)