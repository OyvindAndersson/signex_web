import React from 'react'
import Select from 'react-select'
import { Form, Text, Field, withFieldApi} from 'react-form'
/**
 * Select Wrapper
 * 
 * react-form HOC of the react-select component
 * use "props.items" to set data for the select
 * component. Read react-select and react-form
 * API for general use.
 */

export default class SelectField extends React.Component {
    componentDidCatch(error, info){
        console.log("FUCKING FAIL")
        console.error(error)
        console.debug(info)
    }
    validate() {

    }
    render() {
        const { field } = this.props || 'selectField'
        const defaultValue = this.props.value ? this.props.value : 0

        return(
            <Field validate={this.validate} field={field}>
                { fieldApi => {
                    const { onChange, onBlur, field, options, ...rest } = this.props
                    const { value, error, warning, success, setValue, setTouched } = fieldApi
                    return(
                    <Select 
                        value={value || '' }
                        onChange={(e) => {
                            setValue(e ? e.value : e)
                            if(onChange){
                                const id = this.props.id ? this.props.id : null
                                onChange(e, id)
                            }
                        }}
                        options={options}
                        {...rest} />
                    )
                }}
            </Field>
        )
    }
}