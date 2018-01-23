import React from 'react'
import ClientListLink from './ClientListLink'

/**-------------------------------------------------
 * Clients Item List
 * -------------------------------------------------
 * Item list for Clients models. Passed as only child
 * to MasterItemList
 */
export default class ClientList extends React.Component {
    render(){
        const {items, selectedItemId} = this.props
        const renderItems = items.map( item => {
            const active = item.id == selectedItemId
            return (
                <ClientListLink 
                    key={item.id} 
                    data={item} 
                    active={active}
                    handleSelectionChanged={this.props.handleSelectionChanged} />
            )
        })

        return (
            <div className="list-group" >
                {renderItems}
            </div>
        )
    }
}