import React from 'react'

import Select from 'react-select'
import { Text, TextArea, NestedField, withFormApi } from 'react-form'
import { UncontrolledAlert } from 'reactstrap'
import { SelectField, DateTimeField, TextValidation } from '../../utils/react-form-hocs'
import { LabeledFormGroup, FormGroup } from '../../utils/bootstrap'

/**
 * Product Line Row
 * Represents a single product line in a ProductTableForm
 */
class ProductLineRow extends React.Component{
    constructor(props){
        super(props)

        this.defaultOnRemove = this.defaultOnRemove.bind(this)
        this.validateInput = this.validateInput.bind(this)
    }

    defaultOnRemove(e){
        console.debug('No remove handler')
    }

    validateInput(e){
        const { description, discount, price, units } = e
        
        return {
            error: !description ? "Produktlinje må ha en beskrivelse" : null
        }
    }

    render(){
        const { lineIndex, field, onRemove, state } = this.props
        const lineNum = lineIndex + 1 // Not using zero based index for product line nums
        var sum = 0
        try {
            sum =  state.price * (1-(state.discount / 100)) * state.units
        } catch(e){ sum = "Error" }
        

        return(
            <NestedField field={field} validate={this.validateInput}>
            <tr>
                <th scope="row">{`${lineIndex + 1}`}</th>
                <td>
                    <TextValidation className="form-control form-control-sm" 
                        field={'description'} 
                        id={`description-${this.props.lineIndex}`} 
                        defaultValue={this.props.description}
                        validate={(value) => ({ error: !value || value !== 'Cunt' ? "Bitch" : null })} />
                </td>
                <td>
                    <Text className="form-control form-control-sm" 
                        field={'units'} 
                        id={`units-${this.props.lineIndex}`} 
                        defaultValue={this.props.units}
                        type="number"
                        min="0" />
                </td>

                <td>
                    <Text className="form-control form-control-sm" 
                        field={'price'} 
                        id={`price-${this.props.lineIndex}`} 
                        defaultValue={this.props.price} />
                </td>

                <td>
                    <Text className="form-control form-control-sm" 
                        field={'discount'} 
                        id={`discount-${this.props.lineIndex}`}
                        defaultValue={this.props.discount} />
                </td>

                <td>
                    <input className="form-control form-control-sm" value={sum || 0} max="100" min="0" readOnly />
                </td>

                <td><button className="btn btn-danger btn-sm btn-block" type="button" onClick={onRemove}>-</button></td>
            </tr>
            </NestedField>
        )
    }
    
}
ProductLineRow.defaultProps = {
    description: '',
    price: 0.0,
    units: 1,
    discount: 0
}

/**
 * Product Table Form
 * React-Form based. Dynamic form for products in an order.
 */
class ProductTableForm extends React.Component {
    constructor(props){
        super(props)
        this.addLine = this.addLine.bind(this)
    }

    addLine(){
        const {formApi} = this.props
        if(formApi){
            formApi.addValue('products', '')
        } 
    }

    render(){

        const {formApi} = this.props || null
        return(
            <div className="row">
                <div className="col">
                    
                    <table className="table table-sm products-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" style={ {width: '40%'}}>Beskrivelse</th>
                                <th scope="col">Antall</th>
                                <th scope="col">Pris</th>
                                <th scope="col">Rabatt</th>
                                <th scope="col">Sum</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        { formApi.values.products && formApi.values.products.map( (product, i) => (
                            <ProductLineRow 
                                state={product}
                                key={`product${i}`} 
                                field={['products', i]} 
                                lineIndex={i}
                                onRemove={ () => formApi.removeValue('products', i)}/>
                        ))}
                        </tbody>
                    </table>
                    <hr />
                    <button className="btn btn-primary" type="button" onClick={this.addLine}>Add +</button>
                </div>
            </div>
        )
    }
}

export default withFormApi(ProductTableForm)