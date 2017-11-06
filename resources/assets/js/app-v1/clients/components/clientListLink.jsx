import React from 'react'

/**-------------------------------------------------
 * Client Item List Link
 * -------------------------------------------------
 * List link (item) for Clients item list display.
 */
export default class ClientListLink extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            active: false
        }
    }
    handleClick(e){
        if(this.props.handleSelectionChanged){
            e.persist()
            this.props.handleSelectionChanged(e)
        }
    }
    componentWillReceiveProps(newProps){
        if(newProps.active !== this.props.active){
            this.setState({ active: newProps.active })
        }
    }
    render(){
        const client = this.props.data
        const name = client.name.toUpperCase()
        const classes = `list-group-item list-group-item-action ${this.state.active ? 'active' : ''}`

        return(
            <a href="#" data-target-id={client.id}
                onClick={this.handleClick.bind(this)} 
                className={classes}>
                <h6 style={{ fontSize: 14 +'px'}}>{name}</h6>
                <small>{client.org_nr}</small>
            </a>
        )
    }
}