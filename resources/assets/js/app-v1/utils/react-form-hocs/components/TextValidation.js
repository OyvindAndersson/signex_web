import React from 'react'
import Select from 'react-select'
import { Form, Text, Field, withFieldApi} from 'react-form'

const ValidationMessage = props => {
    const {type, message} = props
    var typeClass = ''

    switch(type){
        case 'error': typeClass = 'invalid-feedback'
        break
        case 'warning': typeClass = 'invalid-feedback'
        break
        case 'success': typeClass = 'valid-feedback'
        break
    }

    return (
        <div className={typeClass}>
          {message || ''}
        </div>
    )
}

// Generic validator. Custom validator should be passed by props
const validate = value => ({

})

const TextValidation = props => (
    <Field validate={props.validate || validate } field={props.field}>
    {fieldApi => {
        const { onChange, onBlur, field, validate, ...rest } = props
        const { value, error, warning, success, setValue, setTouched } = fieldApi

        return(
            <div>
                <input
                    {...rest}
                    value={value || ''}
                    onChange={e => {
                        setValue(e.target.value)
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
                { error ? (<ValidationMessage message={error} type="error" />) : null }
            </div>
        )
    }}
    </Field>
)

export default TextValidation