import React from "react";
import dataService from "../../services/dataServices";
import colors from "../../config/colors";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import ReactLoading from "react-loading";
import { buttonStyleOpen } from "../../config/buttonStyle";
import { removeUser, setUser } from "../../services/userServices";
import QueryString from "query-string";

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
  
  const { redirect } = QueryString.parse(props.location.search);
  const { user } = props;
  
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState("");
  const [pic, setPic] = React.useState("");

  const classes = useStyles();

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
      // if (location.state) {
      //   removeUser();
      //   setUser(data.body);
      //   return window.location = `/profile/${encode(user.userId)}`;
      // }

      removeUser();
      setUser(data.body);
      return window.location = redirect ? redirect : '/';

    } catch (e) {
      console.log(e.message);
      toast.error("Something went wrong.");
    }
  };
  return (
    <Container>
      <Typography variant="h5" className={classes.title}>
      { `Congrats ${user.firstName}! you are now a tremoller....`}
      </Typography>
      <br />
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={6}>
          <form onSubmit={handleSubmit} autoComplete="off">
         
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
