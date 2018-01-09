import React from 'react'
import Select from 'react-select'
import { Form, Text, FormField } from 'react-form'
/**
 * Select Wrapper
 * 
 * react-form HOC of the react-select component
 * use "props.items" to set data for the select
 * component. Read react-select and react-form
 * API for general use.
 */
class SelectWrapper extends React.Component {

    componentWillReceiveProps(next){
        const { fieldApi, value } = next
        const { setValue, getValue } = fieldApi

        if(!getValue()){
            setValue(value)
        }
    }
    
    render() {
        const {fieldApi, options, onChange, value, ...rest} = this.props
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
                        if(onChange){
                            onChange(e)
                        }
                    }}
                    options={options}
                    {...rest} />
            </div>
        )
    }
}
const SelectField = FormField(SelectWrapper)

export default SelectField