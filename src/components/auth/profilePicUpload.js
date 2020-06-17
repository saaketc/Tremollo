import React from 'react'
import TextForm from "../common/textForm";
import logo from "../../logo/logo_lite_crop.png";
import dataService from "../../services/dataServices";
import colors from "../../config/colors";

import { Container, Grid, Typography, Button } from "@material-ui/core";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'; 
import { makeStyles } from "@material-ui/core/styles";
  
const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: '600'
  },
  btn: {
    color: colors.white,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primary,
    "&:hover": {
      backgroundColor: colors.primary,
    }
  }
}));
const ProfilePicUpload = (props) => {
  const history = useHistory();  
  const [file, setFile] = React.useState(null);
  const classes = useStyles();
  const { user, location } = props;

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
        // console.log(data.body);
          if (location.state) {
            return history.push(`/profile/${window.btoa(user.userId)}`);
          }
          return history.push('/');
        }
        catch (e) {
            console.log(e.message);
            toast.error('Something went wrong.');
        }
    }
    return (
        <Container>
        
      <Typography variant="h4" className={classes.title}>
          {user.firstName} upload your profile pic
      </Typography>
      <br />

      <form onSubmit={handleSubmit} autoComplete="off">
          <TextForm
          
          type="file"
          name="file"
          required={true}
          onChange={handleChange}
          />
          <br/>
          <br/>
                <Button className={classes.btn} type='submit'>Upload</Button>
        </form>        
        </Container>
    )
}

export default ProfilePicUpload
