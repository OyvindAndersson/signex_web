import React from 'react'

import Select from 'react-select'
import { Text, TextArea, Checkbox, NestedField, withFormApi } from 'react-form'
import { UncontrolledAlert } from 'reactstrap'
import { SelectField, DateTimeField, TextValidation, CheckBox } from '../../utils/react-form-hocs'
import { LabeledFormGroup, FormGroup } from '../../utils/bootstrap'


/**
 * Product Line Row
 * Represents a single product line in a ProductTableForm
 */
class ProductLineRow extends React.Component{
    constructor(props){
        super(props)

        this.defaultOnRemove = this.defaultOnRemove.bind(this)
    }

    defaultOnRemove(e){
        console.debug('No remove handler')
    }

    render(){
        const { lineIndex, field, onRemove, product } = this.props
        const lineNum = lineIndex + 1 // Not using zero based index for product line nums
        
        const defaultValues = {
            id: product.id || 0,
            description: product.description || '',
            units: product.units || 1,
            price: product.price || 0.0,
            discount: product.discount || 0,
            stocked: product.stocked || false
        }

        var sum = 0
        try { sum =  product.price * (1-(product.discount / 100)) * product.units } catch(err) { }
        

        return(
            <NestedField field={field} validate={this.validateInput} defaultValues={defaultValues}>
            <tr>
                <th scope="row">{`${lineIndex + 1}`}</th>
                <td>
                    <Text type="hidden" field={'id'} />
                    <Text className="form-control form-control-sm"
                        field={'description'} 
                        id={`description-${this.props.lineIndex}`}
                        minLength="3"
                        required />
                </td>
                <td>
                    <Text className="form-control form-control-sm" 
                        field={'units'} 
                        id={`units-${this.props.lineIndex}`}
                        type="number"
                        min="0"
                        step="1"
                        pattern="\d+" />
                </td>

                <td>
                    <Text className="form-control form-control-sm" 
                        field={'price'} 
                        id={`price-${this.props.lineIndex}`}
                        pattern="[0-9]+([\.,][0-9]+)?" />
                </td>

                <td>
                    <Text className="form-control form-control-sm" 
                        field={'discount'} 
                        id={`discount-${this.props.lineIndex}`}
                        value={this.props.discount} />
                </td>

                <td>
                    <input type="text" className="form-control form-control-sm" value={sum || 0} max="100" min="0" readOnly />
                </td>

                <td>
                    <div className="form-check">
                        <CheckBox className="form-check-input position-static" 
                            field={'stocked'} 
                            id={`stocked-${this.props.lineIndex}`} />
                    </div>
                </td>

                <td><button className="btn btn-danger btn-sm btn-block" type="button" onClick={onRemove}>-</button></td>
            </tr>
            </NestedField>
        )
    }
    
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
                                product={product}
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