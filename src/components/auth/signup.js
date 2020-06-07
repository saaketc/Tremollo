import React from 'react'
import { useHistory } from 'react-router-dom';

import dataService from '../../services/dataServices';
import Form from '../common/form';
import { toast } from 'react-toastify';

const Signup1 = () => {
    const history = useHistory();
    const fields = [
        // { name: 'fName', label: 'First Name', type: 'text' },
        // { name: 'lName', label: 'Last Name', type: 'text' },
        // { name: 'dob', label: 'Date of Birth', type: 'date' },
        { name: 'username', label: 'Username', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },

    ]; 
    const button = { type: 'submit', label: 'Continue', color: '#bf2604' };

    const postSubmitLogic = (submittedFormData) => {
        // api call or something
        // eg
        // console.log(submittedFormData);
        history.push('/auth/signup/join', submittedFormData);
    }
    return (
    <>
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='Join Tremollo to fall in love with new flavours of music!'
                fields={fields}
                button={button} /> 
    </>
  )
}
// after first signup

const Signup2 = (props) => {
    const history = useHistory();
    const data = history.location.state;
    const fields = [
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'gender', label: 'Gender', type: 'text' },
        { name: 'about', label: 'About', type: 'text' },
        { name: 'type', label: 'Type', type: 'text' },
        // { name: 'gender', label: 'Female', type: 'radio' },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
      
    ]; 
    // const dropDown = {
    //     name: 'gender', label: 'Gender', options: ['Male', 'Female']
    // };
    const button = { type: 'submit', label: 'Join', color: '#bf2604' };

    const postSubmitLogic = async (submittedFormData) => {
        // api call or something
        // eg
        // console.log(submittedFormData);
        let user = { ...submittedFormData, ...data };
        // console.log(user);
        try {
            const { data } = await dataService.postData('user/create', user);
            console.log('from backend', data.body);
            console.log(user);
            localStorage.setItem('user', JSON.stringify(data.body));
            
            window.location = '/';
        }
        catch (e) {
            console.log(e.message);
            toast.error('Something went wrong');
        }
    }
    return (
    <>
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='Join Tremollo to fall in love with new flavours of music!'
                fields={fields}
              
                button={button} /> 
    </>
  )
}

const Signup = (props) => {
    const path = props.location.pathname;
    if (path === '/auth/signup/join')
        return <Signup2 />;
    else if (path === '/auth/signup')
        return <Signup1 />;
}
export default Signup;
