import React from 'react'
import {Collapse, Button } from 'reactstrap'

/**-------------------------------------------------
 * Master items list
 * -------------------------------------------------
 * Takes the "links"/items for a master/detail page
 * list. 
 * 
 * @todo Make this a ClientMAsterItemList class, which churns the data down to
 * a generic list, usable in a MasterItemList component...?
 */
export default class MasterItemList extends React.Component {
    constructor(props){
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            items: props.items,
            collapsed: false
        }
    }
    componentWillReceiveProps(props){
        this.setState({ items: props.items })
    }
    toggle(){
        this.setState({ collapsed: !this.state.collapsed})
    }
    render() {
        return (
        <div>
            <Button className="d-block d-sm-none w-100" 
                color="primary" 
                onClick={this.toggle} 
                style={{ marginBottom: '1rem' }}>
                Hide / Show list
            </Button>
            <Collapse isOpen={!this.state.collapsed} >
                {React.cloneElement(React.Children.only(this.props.children), {...this.props})}
            </Collapse>
        </div>
        )
    }
}