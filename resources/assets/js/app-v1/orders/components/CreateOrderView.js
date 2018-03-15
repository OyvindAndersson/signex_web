import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {withRouter} from 'react-router-dom'

// presentation
import Select from 'react-select'
import { NestedField, Form, Text, TextArea } from 'react-form'
import { UncontrolledAlert } from 'reactstrap'
//import { SelectField, DateTimeField } from 'AppUtils/react-form-hocs/components/SelectField'
import SelectField from 'AppUtils/react-form-hocs/components/SelectField'
import DateTimeField from 'AppUtils/react-form-hocs/components/DateTimeField'
import { LabeledFormGroup, FormGroup } from '../../utils/bootstrap'
import { toast } from 'react-toastify'
import { toastIt } from "../../common/components/toastIt"

import ProductTable from './ProductTable'

// actions and selectors
import {getDenormalizedClients} from 'Clients/selectors'
import {getDenormalizedUsers} from 'Auth/selectors'
import {getOrderErrors, getOrderNotify} from '../selectors'
import { createOrderAction } from "../actions"
import {getDenormalizedOrdertypes} from '../../ordertypes'


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

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmitFail = this.handleSubmitFail.bind(this)
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
        if(next.notify){
            this.setState({
                notify: next.notify
            })
            toastIt(next.notify)
            this.resetForm()
        }
    }
    handleSubmit(values, e, formApi){
        const { createOrder } = this.props
        const mutatedValues = _.clone(values, true)

        // format for MYSQL
        mutatedValues.order.due_at = moment(mutatedValues.order.due_at).format('Y-MM-D H:m:s')
        mutatedValues.order.registered_at = moment(mutatedValues.order.registered_at).format('Y-MM-D H:m:s')

        console.debug(mutatedValues)
        
        createOrder(mutatedValues)

        // We need a reference to formApi in resetForm(), 
        // which will only ever be called after a submit
        this.formApi = formApi
    }
    handleSubmitFail(errors, onSubmitError, formApi){
        const form = document.getElementsByName('createOrderForm')
        if(form[0]){
            form[0].classList.add('was-validated')
        }
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
		const orderTypes = this.props.ordertypes.map( (type, index) => {
			return { value: index+1, label: type.name }
		} )
        // FIXME: Fetch api
        const orderStatuses = [
            { value: 1, label: "Quote"},
            { value: 2, label: "Registered"},
            { value: 3, label: "In progress"},
            { value: 4, label: "Finished / Sent"},
            { value: 5, label: "Archived"},
        ]

        const basicDefaults = {
            order: {
                registered_at: moment(),
                due_at: moment().add(7, 'days'),
                status_id: 1,
                client_id: 1,
                user_id: 1,
                type: 1,
            }
        }

        return(
        <div className="col-md-10 col-md-offset-1">
            <Form onSubmit={this.handleSubmit} onSubmitFailure={this.handleSubmitFail} defaultValues={basicDefaults}>
            { formApi => (
            <form name="createOrderForm" onSubmit={formApi.submitForm}>
                <div className="form-row">
                    {/* Order details*/}
                    <div className="col-md-3">
                        <h5 className="mt-4 mb-4">Basis info</h5>
                        <LabeledFormGroup htmlFor="clientInput" label="Client" rowFormat>
                            <SelectField 
                                required
                                field="order.client_id" 
                                id="clientInput" 
                                options={clientOptions} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="userInput" label="Our ref" rowFormat>
                            <SelectField 
                                required
                                field="order.user_id" 
                                id="userInput"
                                options={userOptions} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="statusInput" label="Status" rowFormat>
                            <SelectField 
                                required
                                field="order.status_id" 
                                id="statusInput"
                                options={orderStatuses} />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="descriptionInput" label="Description">
                            <TextArea 
                                id="descriptionInput" 
                                field="order.description"
                                className="form-control" />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="createdAtInput" label="Taken at:" rowFormat>
                            <DateTimeField 
                                required
                                field="order.registered_at"
                                id="createdAtInput" />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="dueAtInput" label="Due at:" rowFormat>
                            <DateTimeField 
                                required
                                field="order.due_at"
                                id="dueAtInput" />
                        </LabeledFormGroup>
                        <LabeledFormGroup htmlFor="typeInput" label="Type" rowFormat>
                            <SelectField 
                                required
                                field="order.type" 
                                id="typeInput"
                                options={orderTypes} />
                        </LabeledFormGroup>
                        
                    </div>

                    {/* Products */}
                    <div className="col-md-6">
                        <h5 className="mt-4 mb-4">Varlinjer</h5>
                        <ProductTable />
                    </div>

                    {/* Tasks */}
                    <div className="col-md-3">
                        <h5 className="mt-4 mb-4">Prosjektoppgaver</h5>
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
        user: state.auth.user,
		ordertypes: getDenormalizedOrdertypes(state)
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