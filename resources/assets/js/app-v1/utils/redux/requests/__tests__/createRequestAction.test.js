import {createRequestAction} from '../../utils/createRequestAction'
import * as actions from '../actions'

describe('createRequestAction function', function(){

    let request

    beforeEach(() => {
        request = () => new Promise(() => {})
    })

    it('meta creator should add additional meta properties to the action', function(){

        let action = createRequestAction(
            'MY_ACTION', 
            request,
            null,
            () => ({ anotherMetaProperty: [] })
        )

        let result = action()

        expect(result.meta).toEqual(
            { 
                requestType: 'MY_ACTION', 
                request: request, 
                anotherMetaProperty: [] 
            }
        )
    })
})