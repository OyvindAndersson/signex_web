import React from 'react'

import Select from 'react-select'
import { Text, TextArea, NestedField, withFormApi } from 'react-form'
import { UncontrolledAlert } from 'reactstrap'
import { SelectField, DateTimeField } from '../../utils/react-form-hocs'
import { LabeledFormGroup, FormGroup } from '../../utils/bootstrap'

class ProductLineRow extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            description: '',
            price: 0.0,
            units: 1
        }
    }

    render(){
        const { lineIndex } = this.props || 0
        return(
            <tr>
                <th scope="row"></th>
                <td><Text className="form-control" field={'price'} id={`price-${this.props.lineIndex}`} value={this.state.price} /></td>
                <td></td>
                <td></td>
                <td><button className="btn btn-sm btn-danger" type="button">x</button></td>
            </tr>
        )
    }
    
}

class ProductTableForm extends React.Component {
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" type="button" onClick={this.addLine}>Add + </button>
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Units</th>
                                <th scope="col">Sum</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withFormApi(ProductTableForm)