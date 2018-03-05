import React from 'react'
import {Field} from 'react-form'
import moment from 'moment'
import DateTime from 'react-datetime'

const defaultProps = {
    dateFormat: 'DD.MM.Y ',
    timeFormat: 'H:mm',
    locale: 'nb',
    closeOnSelect: true,
}

/**
 * Date Time Field wrapper
 * 
 * Wraps the react-datetime component for use
 * with react-form
 * 
 * @todo DefaultValue is not set for react-form. Need to setValue() somewhere...
 * @see react-datetime API for props and options https://github.com/YouCanBookMe/react-datetime
 */
export default class DateTimeField extends React.Component {
    constructor(props){
        super(props)

        this.renderInput = this.renderInput.bind(this)
    }

    componentWillReceiveProps(next){
        const { fieldApi, defaultValue } = next
        const { setValue, getValue } = fieldApi

        const fullFormat = `${this.props.dateFormat}${this.props.timeFormat}`

        // If initially we don't have a value set, we must hack it in here
        // for react-form to read it as submitted data, if the user dont
        // manually change the default value interactively.
        if(!getValue()){
            setValue(defaultValue.format(fullFormat))
        }
    }

    render(){

        // We need to format for every setValue, or else it (weirdly) clears
        // the initial formatting when changing another instance of DateTime
        // on the same page.
        const fullFormat = `${this.props.dateFormat}${this.props.timeFormat}`

        const { field } = this.props || 'dateTimeField'

        return(
            <Field validate={this.validate} field={field}>
                { fieldApi => {
                    const { onChange, onBlur, field, value, ...rest } = props
                    const {  error, warning, success, getValue, setValue, setTouched } = fieldApi

                    return(
                        <DateTime {...rest} 
                        value={getValue()}
                        onChange={ e => {
                            setValue(e.format(fullFormat))
                            if(onChange){
                                onchange(e, fullFormat)
                            }
                        }}
                        onBlur={ e => {
                            setTouched()
                            if(onBlur){
                                onBlur(e)
                            }
                        }}
                        renderInput={this.renderInput} />
                    )
                }}
            </Field>
        )
    }
    renderInput(props, openCalendar) {
        return(
            <div className="input-group" style={{ zIndex: 0 }}>
                <input {...props} />
                <span className="input-group-btn">
                    <button onClick={openCalendar} className="btn btn-info" type="button">
                        <span className="oi oi-calendar" title="icon name" aria-hidden="true"></span>
                    </button>
                </span>
            </div>  
        )
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        //this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.log("ÆRROR",error, info);
      }
}
DateTimeField.defaultProps = defaultProps
