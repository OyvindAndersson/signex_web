import React from 'react'
import {Field} from 'react-form'
import moment from 'moment'
moment.locale('nb');
import Datetime from 'react-datetime'

export default class DateTimeField extends React.Component {
    constructor(props){
        super(props)
        
    }

    render(){
        return(
            <Field field={this.props.field}>
                { fieldApi => {
                    const { onChange, onBlur, ...rest } = this.props
                    const { value, error, warning, success, setValue, setTouched } = fieldApi

                    return(
                        <Datetime 
                            value={value} 
                            onChange={(value) => {
                                setValue(value)
                                if(onChange){
                                    onChange(value)
                                }
                            }} 
                            onBlur={(e) => {
                                setTouched()
                                if(onBlur){
                                    onBlur()
                                }
                            }}
                            {...rest}
                            />
                    )
                }}
            </Field>
        )
    }
}




const defaultProps = {
    dateFormat: 'DD.MM.Y',
    timeFormat: 'HH:mm',
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
class DateTimeField2 extends React.Component {
    constructor(props){
        super(props)

        this.renderInput = this.renderInput.bind(this)
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
                    const { defaultValue, onChange, onBlur, field, ...rest } = this.props
                    const { error, warning, success, value, setValue, setTouched } = fieldApi

                    return(
                        <DateTime {...rest} 
                        value={ value || setValue(defaultValue)}
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
DateTimeField2.defaultProps = defaultProps
