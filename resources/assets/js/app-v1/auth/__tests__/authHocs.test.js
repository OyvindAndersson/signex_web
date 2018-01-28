import React from 'react'
import { connect } from "react-redux"
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

import { onlyAuth, exceptAuth } from '../components/authHocs'

describe('onlyAuth HOC', () => {
    let MainComponent
    let LoadingComponent
    let ElseComponent
    let WrappedComponent

    beforeEach(() => {
        MainComponent = () => (<div>MainComponent</div>)
        LoadingComponent = () => (<div>LoadingComponent</div>)
        ElseComponent = () => (<div>ElseComponent</div>)
        
        WrappedComponent = connect((state) => ({
            isAuthenticated: state.auth.isAuthenticated,
            isVerifyingLogin: state.auth.isVerifyingLogin,
            isVerifyingToken: state.auth.isVerifyingToken
        }))(onlyAuth({ LoadingComponent, ElseComponent })(MainComponent))
    })

    it('should render MainComponent when only isAuthenticated is true and isVerifyingLogin and isVerifyingToken are both false', () => {
        
        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: true, 
                isVerifyingLogin: false,
                isVerifyingToken: false
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when both isVerifyingLogin and isAuthenticated are true and only isVerifyingToken is false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: true, 
                isVerifyingLogin: true,
                isVerifyingToken: false
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when both isVerifyingToken and isAuthenticated are true and only isVerifyingLogin is false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: true, 
                isVerifyingLogin: false,
                isVerifyingToken: true
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when only isVerifyingToken is true and isAuthenticated and isVerifyingLogin are both false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: false, 
                isVerifyingLogin: false,
                isVerifyingToken: true
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when only isVerifyingLogin is true and isAuthenticated and isVerifyingToken are both false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: false, 
                isVerifyingLogin: true,
                isVerifyingToken: false
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when isVerifyingLogin and isAuthenticated and isVerifyingToken are all true', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: true, 
                isVerifyingLogin: true,
                isVerifyingToken: true
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render ElseComponent when isAuthenticated and isVerifyingLogin and isVerifyingToken are all false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: false, 
                isVerifyingLogin: false,
                isVerifyingToken: false
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })
})

describe('exceptAuth HOC', () => {
    let MainComponent
    let LoadingComponent
    let ElseComponent
    let WrappedComponent

    beforeEach(() => {
        MainComponent = () => (<div>MainComponent</div>)
        LoadingComponent = () => (<div>LoadingComponent</div>)
        ElseComponent = () => (<div>ElseComponent</div>)
        
        WrappedComponent = connect((state) => ({
            isAuthenticated: state.auth.isAuthenticated,
            isVerifyingLogin: state.auth.isVerifyingLogin,
            isVerifyingToken: state.auth.isVerifyingToken
        }))(exceptAuth({ LoadingComponent, ElseComponent })(MainComponent))
    })

    it('should render MainComponent when isAuthenticated and isVerifyingLogin and isVerifyingToken are all false', () => {
        
        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: false, 
                isVerifyingLogin: false,
                isVerifyingToken: false
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when both isVerifyingLogin and isAuthenticated are true, and only isVerifyingToken is false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: true, 
                isVerifyingLogin: true,
                isVerifyingToken: false
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when both isVerifyingToken and isAuthenticated are true, and only isVerifyingLogin is false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: true, 
                isVerifyingLogin: false,
                isVerifyingToken: true
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when only isVerifyingToken is true and isAuthenticated and isVerifyingLogin are both false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: false, 
                isVerifyingLogin: false,
                isVerifyingToken: true
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when only isVerifyingLogin is true and isAuthenticated and isVerifyingToken are both false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: false, 
                isVerifyingLogin: true,
                isVerifyingToken: false
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render LoadingComponent when isVerifyingLogin and isAuthenticated and isVerifyingToken are all true', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: true, 
                isVerifyingLogin: true,
                isVerifyingToken: true
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

    it('should render ElseComponent when only isAuthenticated is true and isVerifyingLogin and isVerifyingToken are both false', () => {

        const mockStore = configureMockStore()({
            auth: { 
                isAuthenticated: true, 
                isVerifyingLogin: false,
                isVerifyingToken: false
            }
        });

        let tree = renderer.create(
            <Provider store={mockStore}>
                <WrappedComponent location={ {state: { from: {pathname: "test"}}}} />
            </Provider>
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })
})