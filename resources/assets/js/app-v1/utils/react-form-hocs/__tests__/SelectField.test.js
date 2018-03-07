import React, {Component} from 'react'
import renderer from 'react-test-renderer'

import { Form } from 'react-form'
import SelectField from '../components/SelectField'

describe('SelecField component', () => {

    it('Should render', () => {
        const options = [{}]
        let tree = renderer.create(
            <Form >
            { formApi => (
                <form onSubmit={() => {}} id="form5">
                    <SelectField required={true}
                                field="order.client_id" 
                                id="clientInput" 
                                options={options}
                                value={1}>
                    </SelectField>
                </form>
            )}
            </Form>
            
        ).toJSON()
        
        expect(tree).toMatchSnapshot()
    })

})
