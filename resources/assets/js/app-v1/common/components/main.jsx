import React from 'react'
import Header from './header'
import Footer from './footer'


export default class Main extends React.Component {
    render(){
        return(
            <main>
                <Header />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                            {this.props.children}
                            </div>
                        </div>
                    </div>
                <Footer />
            </main>
        );
    }
}