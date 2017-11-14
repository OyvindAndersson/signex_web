import React from 'react'

export default class LabeledFormGroup extends React.Component {
    render(){
        const {htmlFor, rowFormat, label, ...rest} = this.props
        if(rowFormat){
            return(
                <div className="form-group row" {...rest}>
                    <Label htmlFor={htmlFor} rowFormat={true}>{label}</Label>
                    <div className="col-sm-8">
                        {this.props.children}
                    </div>
                </div>
            )
        } else {
            return(
                <div className="form-group" {...rest}>
                    <Label htmlFor={htmlFor}>{label}</Label>
                    {this.props.children}
                </div>
            )
        }
        
    }
}

export class FormGroup extends React.Component {
    render(){
        return(
            <div {...this.props}>
                {this.props.children}
            </div>
        )
    }
}
FormGroup.defaultProps = {
    className: 'form-group'
}

class Label extends React.Component {
    render(){
        const {rowFormat, ...rest} = this.props
        const style = { fontSize: 14+'px'}
        if(rowFormat){
            return(
                <label style={style} className="col-sm-4 col-form-label" {...rest}>
                {this.props.children}
                </label>
            )
        }else {
            return(
                <label {...this.props}>{this.props.children}</label>
            )
        }
        
    }
}