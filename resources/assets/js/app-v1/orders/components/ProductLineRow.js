import React from 'react'

import Select from 'react-select'
import { Form, Text, TextArea } from 'react-form'
import { UncontrolledAlert } from 'reactstrap'
import { SelectField, DateTimeField } from '../../utils/react-form-hocs'
import { LabeledFormGroup, FormGroup } from '../../utils/bootstrap'

export class ProductLineRow extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            description: '',
            price: 0.0,
            units: 1
        }
    }
    render(){

        const {formApi} = this.props
        const {lineIndex} = this.props || 0
        const {fieldKeyName} = this.props || 'products'

        return(
            <div className="row">
                <div className="col">
                <LabeledFormGroup htmlFor="descriptionInput" label="Freetext">
                    <Text 
                        id="descriptionInput" 
                        field={[`${fieldKeyName}.description`, lineIndex]}
                        className="form-control" />
                </LabeledFormGroup>
                </div>
                <div className="col">
                <LabeledFormGroup htmlFor="descriptionInput" label="Price">
                    <Text 
                        id="descriptionInput" 
                        field={[`${fieldKeyName}.price`, lineIndex]}
                        className="form-control" />
                </LabeledFormGroup>
                </div>
                <div className="col">
                <LabeledFormGroup htmlFor="descriptionInput" label="Units">
                    <Text 
                        id="descriptionInput" 
                        field={[`${fieldKeyName}.units`, lineIndex]}
                        className="form-control" />
                </LabeledFormGroup>
                </div>
                <div className="col">
                <LabeledFormGroup htmlFor="descriptionInput" label="Total">
                    <input className="form-control" value="0" />
                </LabeledFormGroup>
                </div>
            </div>
        )
    }
}