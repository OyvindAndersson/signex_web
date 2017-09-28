import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../stores';
import AsyncApp from './async-app';

const store = configureStore()

export default class Root extends Component {
    render(){
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        );
    }
}

