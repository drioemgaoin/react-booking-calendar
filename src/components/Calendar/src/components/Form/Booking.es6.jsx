import React from 'react';
import Form from './Form';
import SubmitButton from './SubmitButton';
import Text from './Text';

export default class Boooking extends React.Component  {
    render() {
        return (
            <Form onSubmit={data => console.log(data)}>
                <Text
                  name='firstName'
                  validate={['required']}
                  placeholder='First Name'
                  label='First Name'/>

                <Text
                  name='lastName'
                  validate={['required']}
                  placeholder='Last Name'
                  label='Last Name'/>

                <Text
                  name='email'
                  validate={['required']}
                  placeholder='Email'
                  label='Email'/>

                <Text
                    name='phone'
                    validate={['required']}
                    placeholder='Phone'
                    label='Phone'/>

                <SubmitButton/>
            </Form>
        );
    }
}
