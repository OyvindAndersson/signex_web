import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import moxios from 'moxios'
import * as actions from '../actions'
import types from '../actionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('AUTH_* actions', () => {
    beforeEach(() => { moxios.install() })
    afterEach(() => { moxios.uninstall() })

    it('should start login request', () => {
       // expect.assertions(1)
       return expect(actions.requestLogin()).toEqual({
           type: types.AUTH_LOGIN_USER
       })
    })

    it('should dispatch successful login with valid credentials', () => {
        const store = mockStore({ auth: { user: {}}})
        const credentials = {email: 'test', password: 'secret'}
        const expectedActions = [
            types.AUTH_LOGIN_USER,
            types.AUTH_LOGIN_USER_SUCCESS
        ]

        moxios.wait(function () {
            let request = moxios.requests.mostRecent()
            // respond as if credentials were correct
            request.respondWith({
                status: 200,
                response: { data: { token: ''}}
            })
        })

        return store
            .dispatch(actions.authLoginUser(credentials))
            .then(() => {
                const actualActions = store.getActions().map(action => action.type)
                expect(actualActions).toEqual(expectedActions)
            })
    })

    it('should dispatch rejected login with invalid credentials', () => {
        const store = mockStore({ auth: { user: {}}})
        const credentials = {email: 'test', password: 'secret'}
        const expectedActions = [
            types.AUTH_LOGIN_USER,
            types.AUTH_LOGIN_USER_REJECTED
        ]

        moxios.wait(function () {
            let request = moxios.requests.mostRecent()
            // respond as if credentials were correct
            request.respondWith({
                status: 401,
                response: { data: { token: ''}}
            })
        })

        return store
            .dispatch(actions.authLoginUser(credentials))
            .then(() => {
                const actualActions = store.getActions().map(action => action.type)
                expect(actualActions).toEqual(expectedActions)
            })
    })
})