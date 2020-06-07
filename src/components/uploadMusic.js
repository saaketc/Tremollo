import React from 'react'
import { toast } from 'react-toastify';

import dataService from '../services/dataServices';

const UploadMusic = () => {
    
    const [uploadFile, setUploadFile] = React.useState(null);
    React.useEffect(() => {
                
    }, [uploadFile])
    const handleChange = (event) => {

        setUploadFile(event.target.files[0]);
        // console.log(event.target.files[0]);
        // const reader = new FileReader();
        // reader.readAsDataURL(event.target.files[0]);

        // reader.onload = async (event) => {
        //     console.log(event.target.result);
        //     const formData = event.target.result;
        //     try {
        //         const { data } = await dataService.putData('content/upload/file', formData);
        //         console.log(data);
        //     }
        //     catch (e) {
        //         console.log(e.message);
        //     }
        // }
}
    return (
        <>
            <form encType="multipart/form-data" >
                <input type="file" name="file" onChange={(event)=>handleChange(event)}/>
                
            </form>
        </>
    )
}

export default UploadMusic