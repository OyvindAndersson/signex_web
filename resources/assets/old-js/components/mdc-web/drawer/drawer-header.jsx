import React from 'react'

export default class DrawerHeader extends React.PureComponent {
    render(){
        return(
            <header className="mdc-persistent-drawer__header">
                {this.props.children}
            </header>
        );
    }
}

export class DrawerHeaderContent extends React.PureComponent {
    render(){
        return(
            <div className="mdc-persistent-drawer__header-content">
                {this.props.children}
            </div>
        );
    }
}