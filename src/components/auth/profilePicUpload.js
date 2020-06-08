import React from 'react'
import TextForm from "../common/textForm";
import logo from "../../logo/logo_lite_crop.png";
import dataService from "../../services/dataServices";

import { Container, Grid, Typography, Button } from "@material-ui/core";
import { toast } from 'react-toastify';

const ProfilePicUpload = ({user}) => {
    const [file, setFile] = React.useState(null);

    const handleChange = ({ currentTarget }) => {
        const pic = currentTarget.files[0];
        setFile(pic);
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', user.userId)
        const { data } = await dataService.putData('user/avatar', formData, 'multipart/form-data');
        console.log(data.body);
        }
        catch (e) {
            console.log(e.message);
            toast.error('Something went wrong.');
        }
    }
    return (
        <Container>
        
      <Typography variant="h5">
        Upload your profile pic
      </Typography>
      <br />

      <form onSubmit={handleSubmit} autoComplete="off">
        <TextForm
         
          
          type="file"
          name="file"
          required={true}
          onChange={handleChange}
                />
                <Button type='submit'>Upload</Button>
        </form>        
        </Container>
    )
}

export default ProfilePicUpload
