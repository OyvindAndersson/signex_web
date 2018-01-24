/**
 * All types of create forms for the Client model
* Simpler to organize all in one file
* @todo If components become too large, move to seperate
*/

import React from 'react'
import {connect} from 'react-redux'

import Brreg from 'AppUtils/brreg'
import { createClientAction } from 'Clients/actions'
import { isCreateClientActive, didCreateClientFail  } from 'Clients/selectors'
import { toast } from 'react-toastify'

class ClientDataSelectItem extends React.Component {
    constructor(props){
        super(props)

        this.handleDataItemSelected = this.handleDataItemSelected.bind(this)
    }

    handleDataItemSelected(e){
        if(this.props.handleDataItemSelected){
            this.props.handleDataItemSelected(this.props.itemData)
        }
    }
    render(){
        const item = this.props.itemData
        const employees = item.antallAnsatte ? item.antallAnsatte : null

        let address = null
        if(item.forretningsadresse){
            address = {
                street: item.forretningsadresse.adresse ? item.forretningsadresse.adresse : '',
                area: item.forretningsadresse.poststed ? item.forretningsadresse.poststed : ''
            }
        }

        return(
            <a className="list-group-item list-group-item-action flex-column align-items-start"
                onClick={this.handleDataItemSelected}>

                <div className="d-flex w-100 justify-content-between">
                    <small className="mb-1"><strong>{item.navn}</strong></small>
                    <small>{item.organisasjonsnummer}</small>
                </div>
                <ul className="item-data">
                    { employees ? (<li>{employees} employees</li>) : null }
                    { address ? (<li>{address.street}, {address.area}</li>) : null }
                </ul>
            </a>
        )
    }
}

/**-------------------------------------------------
 * Client Create Inline Form View
 * -------------------------------------------------
 * Inline/navbar form for quickly creating new clients
 * 
 * @todo Auto-focus / tab to list when results show, so we can navigate the results with up/down/tab keys
 */
class ClientCreateInlineFormView extends React.Component {
    constructor(props){
        super(props)

        this.handleInputChanged = this.handleInputChanged.bind(this)
        this.handleBrregCallback = this.handleBrregCallback.bind(this)
        this.handleSelectBoxItemSelected = this.handleSelectBoxItemSelected.bind(this)
        this.handleClientCreateForm = this.handleClientCreateForm.bind(this)
        this.onSuccess = this.onSuccess.bind(this)

        // handleBrregCallback called when Brreg has got a response from server
        this.brreg = new Brreg(this.handleBrregCallback)
        this.state = {
            clientName: '',
            clientOrgNr: '',
            brregResults: [],
            isSavingClient: false,
            saveClientFailed: false,
            saveSuccess: false
        }
    }

    componentWillReceiveProps(props){
        if(this.state.isSavingClient){
            this.setState({
                isSavingClient: false,
                saveSuccess: props.saveSuccess
            })

            if(props.saveSuccess){
                this.onSuccess()
            } else {
                toast.error(`Client failed to save!`)
            }
            
        }
    }

    onSuccess(){
        if(this.props.onSuccess){
            this.props.onSuccess()
        }
    }

    handleInputChanged(e){
        const {value, name} = e.target

        this.setState({
            [name]: value
        })

        // Update results. API only responds to queries with filter > 2 chars.
        if(value.length > 2){
            this.brreg.searchByName(value, 5)
        } else {
            // hack for now. Hides the result list UI
            this.handleBrregCallback(null)
        }
    
    }

    handleBrregCallback(results){
        this.setState({
            brregResults: results ? results : []
        })
    }

    handleSelectBoxItemSelected(dataItem){
        this.setState({ 
            clientName: dataItem.navn,
            clientOrgNr: dataItem.organisasjonsnummer,
            brregResults: []
        })
        // The brreg data was selected and filled in the form
        // now, clear all results and focus the submit button
        // for quick submit
        this.refs.submitBtn.focus()
    }

    handleClientCreateForm(e){
        e.preventDefault()

        this.props.createClient({
            name: this.state.clientName,
            org_nr: this.state.clientOrgNr
        })

        this.setState({
            clientName: '',
            clientOrgNr: '',
            isSavingClient: true,
            saveSuccess: false  // So we can respond in willReceiveProps to this actually happening
        })

        toast.info(`Saving...`)
    }

    render(){
        const brregData = this.state.brregResults.map((item) => {
            return (
                <ClientDataSelectItem key={item.organisasjonsnummer} 
                itemData={item} 
                handleDataItemSelected={this.handleSelectBoxItemSelected} />
            )
        })

        return(
        <form onSubmit={this.handleClientCreateForm}  className="form-inline my-2 my-lg-0">
            <div className="form-group">
                <span className="navbar-text mr-sm-2">Ny kunde i farta:</span>
                <div className="data-select">
                    <input className="form-control mr-sm-2"
                        name="clientName"
                        placeholder="Client..."
                        autoComplete="off"
                        value={this.state.clientName}
                        onChange={this.handleInputChanged} />

                    <div className="result-box" >
                        <div className="list-group">
                            {brregData}
                        </div>
                    </div>
                </div>

                <input className="form-control mr-sm-2"
                    name="clientOrgNr" 
                    placeholder="org. nr..."
                    autoComplete="off"
                    value={this.state.clientOrgNr}
                    onChange={this.handleInputChanged} />

                <button ref="submitBtn" 
                    type="submit"
                    className="btn btn-outline-success my-2 my-sm-0">Save
                </button>
            </div>
        </form>
        )
    }
}

function mapStateToProps(state){
    return {
        isSavingClient: isCreateClientActive(state),
        saveClientFailed: didCreateClientFail(state),
        saveSuccess: state.ui.clients.clientCreatedSuccess
    }
}

function mapDispatchToProps(dispatch){
    return {
        createClient: payload => dispatch(createClientAction(payload))
    }
}
 
export const ClientCreateInlineForm = connect(mapStateToProps, mapDispatchToProps)(ClientCreateInlineFormView)