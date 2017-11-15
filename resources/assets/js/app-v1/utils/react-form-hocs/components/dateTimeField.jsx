import React from 'react'
import {FormField} from 'react-form'
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
class DateTimeWrapper extends React.Component {
    constructor(props){
        super(props)

        this.renderInput = this.renderInput.bind(this)
    }
    render(){
        const { fieldApi, onChange, onBlur, value, ...rest } = this.props
        const { getValue, setValue, setTouched } = fieldApi
        
        // We need to format for every setValue, or else it (weirdly) clears
        // the initial formatting when changing another instance of DateTime
        // on the same page.
        const fullFormat = `${this.props.dateFormat}${this.props.timeFormat}`

        return(
            <DateTime {...rest} 
                value={getValue() || setValue(value)} 
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
}
DateTimeWrapper.defaultProps = defaultProps

const DateTimeField = FormField(DateTimeWrapper)
export default DateTimeField