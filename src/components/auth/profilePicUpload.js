import React from "react";
import TextForm from "../common/textForm";
import logo from "../../logo/logo_lite_crop.png";
import dataService from "../../services/dataServices";
import colors from "../../config/colors";

import { Container, Grid, Typography, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ReactLoading from "react-loading";
import { buttonStyleOpen } from "../../config/buttonStyle";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "600",
  },
  btn: {
    color: colors.white,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primary,
    "&:hover": {
      backgroundColor: colors.primary,
    },
  },
}));
const ProfilePicUpload = (props) => {
  const history = useHistory();
  const { redirectUrl } = props.location.state;

  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState("");
  const [pic, setPic] = React.useState("");

  const classes = useStyles();
  const { user, location } = props;

  const handleChange = ({ currentTarget }) => {
    const pic = currentTarget.files[0];
    setFile(pic);

    if (currentTarget.files && currentTarget.files[0]) {
      const fr = new FileReader();
      fr.onload = function (e) {
        setPic(e.currentTarget.result);
      };
      fr.readAsDataURL(currentTarget.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading("pending");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.userId);
      const { data } = await dataService.putData(
        "user/avatar",
        formData,
        "multipart/form-data"
      );
      // console.log(data.body);
      if (location.state.from === 'Profile') {
        return history.push(`/profile/${window.btoa(user.userId)}`);
      }
      return window.location = redirectUrl ? redirectUrl : '/';

    } catch (e) {
      console.log(e.message);
      toast.error("Something went wrong.");
    }
  };
  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        {user.firstName} upload your profile pic
      </Typography>
      <br />
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={6}>
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* <TextForm
          
          type="file"
          name="file"
          required={true}
          onChange={handleChange}
              /> */}
            <Button style={buttonStyleOpen}>
              <label for="file">Choose picture</label>
            </Button>
            <br />
            <br />
            <input
              id="file"
              type="file"
              name="file"
              required
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <br />
            <br />
            <Button className={classes.btn} type="submit">
              Upload
            </Button>
          </form>

          <br />
          <br />
          {uploading === "pending" && (
            <ReactLoading
              type="bars"
              color={colors.primary}
              height={150}
              width={150}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {pic && <img width="500" height="500" id="target" src={pic} alt="" />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePicUpload;
