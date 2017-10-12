import React from 'react'


export default class Header extends React.Component {
    render(){
        return(
            <header>
                <Navbar />
            </header>
        );
    }
}


class Navbar extends React.Component {
    render(){
        return(
            <nav>
                Navbar
            </nav>
        );
    }
}