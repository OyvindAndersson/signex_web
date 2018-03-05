import React, {Component} from 'react'
import renderer from 'react-test-renderer'
import { Form } from 'react-form'
import DateTimeField from '../components/DateTimeField'

describe('SelecField component', () => {

    it('alright', () => {
        let tree = renderer.create(
            <Form >
            { formApi => (
                <form onSubmit={() => {}} id="form5">
                   <DateTimeField>
                   </DateTimeField>
                </form>
            )}
            </Form>
            
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

})
