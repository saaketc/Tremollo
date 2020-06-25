import React from 'react'
import { useHistory } from 'react-router-dom';

import dataService from '../../services/dataServices';
import Form from '../common/form';
import { toast } from 'react-toastify';
import { setUser } from '../../services/userServices';

const Login = () => {
    const history = useHistory();
    const fields = [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' }
    ];
   
    const button = { type: 'submit', label: 'Login', color: '#bf2604' };

    const postSubmitLogic = async (submittedFormData) => {
     
        try {
            const { data } = await dataService.postData('user/login', submittedFormData);
            // console.log('from backend', data.body);
            setUser(data.body);
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
                heading='Welcome back tremolloster! Your amazing music world is waiting for you...'
                fields={fields}

                button={button} />
        </>
    )
}

export default Login