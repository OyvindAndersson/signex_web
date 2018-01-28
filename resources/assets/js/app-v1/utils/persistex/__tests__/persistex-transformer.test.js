import createPersistExTransform from '../index'
import moment from 'moment'
import * as _ from 'lodash'

describe('Redux-Persist expiration transformer', function(){
    // Mockery!!
    global.console = { debug: jest.fn(), log: console.log, warn: jest.fn() }

    it('should do nothing if the state is an empty object', function() {
        let emptyState = {}, transform = createPersistExTransform()

        let inbound = transform.in(emptyState)
        let outbound = transform.out(emptyState)

        expect(inbound).toEqual(emptyState)
        expect(outbound).toEqual(emptyState)
    })

    it('should return the same state if it does not contain any expiration prop that has not expired', function(){
        let state = {
            users: {
                cache: { 
                    isDirty: false,
                    expiresAt: moment().add(1, 'days')
                }
            }
        }
        let transform = createPersistExTransform()

        let inbound = transform.in(state)
        let outbound = transform.out(state)

        expect(inbound).toEqual(state)
        expect(outbound).toEqual(state)
    })

    it('should return a new default state if it contains an expiration prop that has expired', function(){
        let state = {
            users: {
                cache: { 
                    isDirty: false,
                    expiresAt: moment().subtract(7, 'days')
                }
            }
        }

        let transform = createPersistExTransform()

        let inbound = transform.in(state)
        let outbound = transform.out(state)

        expect(inbound).toEqual(state)
        expect(outbound).toEqual({
            users: {
                cache: { 
                    isDirty: true,
                    expiresAt: ''
                }
            }
        })
    })

    it('should allow override of default-state object', function() {
        let state = {
            users: {
                cache: { 
                    isDirty: false,
                    expiresAt: moment().subtract(7, 'days')
                }
            }
        }

        let config = {
            defaultState: { message: 'expired yo' }
        }
        let transform = createPersistExTransform(config)

        let inbound = transform.in(state)
        let outbound = transform.out(state)

        expect(inbound).toEqual(state)
        expect(outbound).toEqual({
            users: {
                cache: { 
                    message: 'expired yo'
                }
            }
        })
    })

    it('should allow override of expire-key selector', function() {
        let state = {
            users: {
                exp: moment().subtract(7, 'days')
            }
        }

        let config = {
            expireKeySelector: 'exp',
            defaultState: { message: 'expired yo' }
        }
        let transform = createPersistExTransform(config)

        let inbound = transform.in(state)
        let outbound = transform.out(state)

        expect(inbound).toEqual(state)
        expect(outbound).toEqual({
            users: {
                message: 'expired yo'
            }
        })
    })
})