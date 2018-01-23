import * as selectors from 'Auth/selectors'

describe('selector isClientAuthenticated', () => {

    beforeEach(() => {
        var localStorageMock = (function() {
            var store = {};
            return {
              getItem: function(key) {
                return store[key];
              },
              setItem: function(key, value) {
                store[key] = value.toString();
              },
              clear: function() {
                store = {};
              },
              removeItem: function(key) {
                delete store[key];
              }
            };
          })();

        // Make window.localStorage available in all test cases.
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    })

    it('should return true if isAuthenticated is set to true in redux state', () => {
        const testState = {
            auth: {
                isAuthenticated: true
            }
        };
        expect(selectors.isClientAuthenticated(testState)).toEqual(true);
    })

    it('should return true if isAuthenticated is set to true in localStorage but false in redux state', () => {
        const testState = {
            auth: {
                isAuthenticated: false
            }
        };
        window.localStorage.setItem('isAuthenticated', true)
        expect(selectors.isClientAuthenticated(testState)).toEqual(true);
    })

    it('should return false if isAuthenticated is false in redux state, and localStorage is undefined', () => {
        const testState = {
            auth: {
                isAuthenticated: false
            }
        };
        delete window.localStorage
        expect(selectors.isClientAuthenticated(testState)).toEqual(false);
    })
})
