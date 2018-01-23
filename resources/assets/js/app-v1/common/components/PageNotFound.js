import React from 'react'
import { connect } from 'react-redux'

/**
 * Page Not Found (404) component
 */
class PageNotFound extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: props.isAuthenticated ? props.isAuthenticated : false,
            isLoaded: false
        }
    }
    componentWillReceiveProps(props){
        this.setState({
            isAuthenticated: props.isAuthenticated
        })
    }
    render(){
        return(
            <div>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col mr-auto">
                            <div className="jumbotron">
                                <h1 className="display-4">Page not found</h1>
                                <p className="lead">
                                The server is not (primarily) a magician; the page <code>{this.props.location.pathname}</code> simply does not exist.
                                </p>
                                <hr className="my-4" />
                                <p className="lead">
                                    <a className="btn btn-primary btn-lg" 
                                    href={ this.state.isAuthenticated ? '/dashboard' : '/login'} 
                                    role="button">Take me home, Server McServerFace</a>&nbsp;
                                {this.state.isAuthenticated ? (
                                    <a className="btn btn-danger btn-lg" 
                                    href="/logout" 
                                    role="button">Log me out, I'm done!</a>
                                ) : null}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, null)(PageNotFound)