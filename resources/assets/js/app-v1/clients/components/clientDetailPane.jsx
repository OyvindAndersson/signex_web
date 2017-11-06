import React from 'react'

export default class ClientDetailPane extends React.Component {
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){

    }
    render(){
        const {client} = this.props

        if(client === null){
            return(
                <div className="row align-items-center">
                    <div className="col"></div>
                    <div className="col align-self-center">
                        <div className="empty-title">Select a client</div>
                    </div>
                    <div className="col"></div>
                </div>
            )
        }
        return(
            <div>
                <h2>{ !client ? "Select a client" : client.name}</h2>
                <label>Organization number</label>
                <input value={client.org_nr} onChange={this.handleChange} className="form-control" />
            </div>
        )
    }
}