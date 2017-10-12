import React from 'react'

export default class Login extends React.Component {
    handleSubmit(e){
        alert(e);
    }
    render() {
        return(
            <div>
                <input type="text" name="email" placeholder="example@example.com" />
                <input type="password" name="password" />
                <button type="submit" onClick={this.handleSubmit.bind(this)}>Login</button>
            </div>
        );
    }
}