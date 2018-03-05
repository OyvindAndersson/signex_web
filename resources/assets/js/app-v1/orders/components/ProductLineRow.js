import React from 'react'

import Select from 'react-select'
import { Text, TextArea } from 'react-form'
import { UncontrolledAlert } from 'reactstrap'
import { SelectField, DateTimeField } from '../../utils/react-form-hocs'
import { LabeledFormGroup, FormGroup } from '../../utils/bootstrap'

const ProductLineRow = () => (
    <div>
        <Text field="cunt" placeholder="Fucker" />
    </div>
)
export default ProductLineRow

 class ProductLineRow2 extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            description: '',
            price: 0.0,
            units: 1
        }
    }
    render(){
        const {lineIndex} = this.props || 0
        const {fieldKeyName} = this.props || 'products'

        return (
            <div>
                <Text className="form-control" field={`${fieldKeyName}`} id={`${fieldKeyName}`} />
            </div>
        )

        return(
            <div className="row">
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
                        <tr>
                            <th scope="row"></th>
                            <td><Text className="form-control" field={`${fieldKeyName}`} id={`${fieldKeyName}`} /></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}