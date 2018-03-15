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

export default class CheckBox extends React.Component {
    componentDidCatch(error, info){
        console.error(error)
        console.debug(info)
    }
    validate() {

    }
    render() {

        return (

            // Use the form field and your custom input together to create your very own input!
            <Field validate={this.validate} field={this.props.field}>
              { fieldApi => {
        
                // Remember to pull off everything you dont want ending up on the <input>
                // thats why we pull off onChange, onBlur, and field
                // Note, the ...rest is important because it allows you to pass any
                // additional fields to the internal <input>.
                const { onChange, onBlur, field, type, ...rest } = this.props
        
                const { value, error, warning, success, setValue, setTouched } = fieldApi
        
                return (
                  <div>
                    <input type="checkbox"
                      {...rest}
                      value={value || ''}
                      checked={value ? true : false }
                      onChange={e => {
                        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
                        setValue(value)
                        if (onChange) {
                          onChange(e.target.value, e)
                        }
                      }}
                      onBlur={e => {
                        setTouched()
                        if (onBlur) {
                          onBlur(e)
                        }
                      }}
                    />
                  </div>
                )
              }}
            </Field>
          )
    }
}