import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ClientForm } from '../client/clients-view';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

export default class ProjectsView extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Projects</h1>
                    </div>

                    <div className="col-md-12">
                    </div>
                </div>

                <ToastContainer 
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                    />
            </div>
        );
    }
}

export class ProjectCreateForm extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                
            </div>
        );
    }
}

if (document.getElementById('projects-view-root')) {
    ReactDOM.render(<ProjectsView />, document.getElementById('projects-view-root'));
}