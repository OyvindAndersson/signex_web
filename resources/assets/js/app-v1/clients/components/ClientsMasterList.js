import React from 'react'
import PropTypes from 'prop-types'
import { MasterItemListItem } from 'Common/components/masterDetailPage'

/**-------------------------------------------------
 * Clients Master List
 * -------------------------------------------------
 * 
 */
export default class ClientsMasterList extends React.Component {
    render(){
        const {items, selectedItemId, handleItemSelectionChanged} = this.props

        const renderItems = items.map( item => {
            const active = item.id == selectedItemId

            return (
                <MasterItemListItem 
                    key={item.id} 
                    item={item} 
                    active={active}
                    classes={`flex-column align-items-start`}
                    onClick={handleItemSelectionChanged}>

                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" style={{ fontSize: 14 +'px'}}><strong>{item.name}</strong></h5>
                        <span className={`badge badge-info`}></span>
                    </div>
                    <p className="orders-master-list-item-client mb-1 font-weight-bold">{item.org_nr}</p>
                    <small></small>

                </MasterItemListItem>
            )
        })

        return (
            <div className="list-group" >
                {renderItems}
            </div>
        )
    }
}
ClientsMasterList.propTypes = {
    items: PropTypes.array,
    selectedItemId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    handleItemSelectionChanged: PropTypes.func
}