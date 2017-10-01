import React, {Component} from 'react';

export default class LaravelErrorBag extends Component {
    constructor(props){
        super(props);

        this.state = {
            errors: (props.errors) ? props.errors : []
        }
    }

    hasErrors(){
        return (Array.isArray(this.state.errors)) && this.state.errors.length > 0;
    }

    componentWillReceiveProps(props){
        if(props.errors.length > 0){
            this.setState({
                errors: props.errors
            });
        }
    }

    render(){
        if(!this.hasErrors()){
            return('');
        }
        let i = 0;
        const errors = this.state.errors.map(error => {
            return (<li key={'errorBagItem_'+i}>{error}</li>);
        });

        return(
            <div>
                <ul>
                    {errors}
                </ul>
            </div>
        );
    }
}