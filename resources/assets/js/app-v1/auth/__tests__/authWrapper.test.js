import React from 'react'
import { connect } from "react-redux"
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import authWrapper from '../components/container/authWrapper'

describe('AuthWrapper component', () => {
    let MainComponent
    let AuthenticatingComponent
    let FailureComponent
    let WrappedComponent

    beforeEach(() => {
        MainComponent = () => (<div>MainComponent</div>)
        AuthenticatingComponent = () => (<div>AuthenticatingComponent</div>)
        FailureComponent = () => (<div>FailureComponent</div>)
        
        WrappedComponent = connect((state) => ({
            isAuthenticated: state.auth.isAuthenticated,
            isAuthenticating: state.auth.isAuthenticating
        }))(authWrapper({ AuthenticatingComponent, FailureComponent })(MainComponent))
    })

    it('should render main component', () => {
        
        const mockStore = configureMockStore()({
            auth: { isAuthenticated: true, isAuthenticating: false }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render authenticating component', () => {

        const mockStore = configureMockStore()({
            auth: { isAuthenticated: false, isAuthenticating: true }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render failure component', () => {

        const mockStore = configureMockStore()({
            auth: { isAuthenticated: false, isAuthenticating: false }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })
})