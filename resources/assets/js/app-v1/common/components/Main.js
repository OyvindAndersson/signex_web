import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { onlyAuth, isClientAuthenticated, isVerifyLoginActive, isVerifyTokenActive } from '../../auth'
import { links } from '../../routes'
import Header from './Header'
import Footer from './Footer'

class PublicMain extends React.Component {
    render(){
        const { navLinks } = this.props
        return(
            <main>
                <Header links={navLinks.public} />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                            {this.props.children}
                            </div>
                        </div>
                    </div>
                <Footer links={navLinks.public} />
            </main>
        )
    }
}

class PrivateMain extends React.Component {
    render(){
        const { navLinks, history, location, match } = this.props
        const headerProps = { history, location, match}
        return(
            <main>
                <Header links={navLinks.private} {...headerProps} />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                            {this.props.children}
                            </div>
                        </div>
                    </div>
                <Footer links={navLinks.private} />
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: isClientAuthenticated(state),
        isVerifyingLogin: isVerifyLoginActive(state),
        isVerifyingToken: isVerifyTokenActive(state)
    }
}

export default withRouter(
    connect(mapStateToProps, {})(
        onlyAuth({ ElseComponent: PublicMain })(PrivateMain)
    )
)