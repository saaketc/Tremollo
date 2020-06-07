import React from 'react';
import Form from '../common/form';

const CreateStudio = () => {
  
    const fields = [
        { name: 'studioName', label: 'Studio Name', type: 'text'},
        { name: 'description', label: 'Studio Description', type: 'text'},
        
    ]; 
    const button = { type: 'submit', label: 'Create studio', color: '#bf2604' };
    const postSubmitLogic = (submittedFormData) => {
        // api call or something
        // eg
        // console.log(submittedFormData);
        
        return window.location = `/studio/${submittedFormData['studioName']}`;
    }
    return (
    <>
            <Form
                postSubmitLogic={postSubmitLogic}
                heading='Create your music studio'
                fields={fields}
                button={button}/>   
    </>
  )
}

export default CreateStudio;
