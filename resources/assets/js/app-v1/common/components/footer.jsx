import React from 'react'
import { ToastContainer } from 'react-toastify';

export default class Footer extends React.Component {
    render(){
        return(
            <footer className="footer">
                <div className="container">
                    <span className="text-muted">Signex v.1.0 © Øyvind Andersson</span>
                </div>

                <ToastContainer 
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                    />
            </footer>
        );
    }
}