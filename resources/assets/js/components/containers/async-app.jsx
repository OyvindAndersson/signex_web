import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

/**
 * Top level container for the entire app.
 * This is used in root container
 * Element is rendered in app.js
 */
class AsyncApp extends Component {
    constructor(props) {
      super(props)
    }

    render(){
        return(
            <div>
                <h2>This is my app</h2>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {};
}

export default connect(mapStateToProps)(AsyncApp)