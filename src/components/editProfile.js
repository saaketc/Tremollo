import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { useFormik } from "formik";
// import SelectForm from "./common/selectForm";
import TextForm from "./common/textForm";
import colors from "../config/colors";
import dataService from "../services/dataServices";
import { toast } from "react-toastify";
import darkTheme from "../config/themes/dark";
import { setUser } from "../services/userServices";
import { buttonStyleOpen } from "../config/buttonStyle";


const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "600",
  },
  btn: {
    color: colors.white,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primary,
    "&:hover": {
      backgroundColor: darkTheme.primary,
    },
  },
  left: {
    alignText: "left",
  },
  success: {
    background: darkTheme.primary,
    color: darkTheme.textColor
  }
}));

const EditProfile = ({ user, location }) => {
  const classes = useStyles();
  const { followersCount } = location.state;
  
  const [userNew, setUserNew] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    about: user.about,
    
  });

  const handleChange = ({ currentTarget }) => {
    let arr = { ...userNew };
    arr[currentTarget.name] = currentTarget.value;
    setUserNew(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newData = {
       
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        username: user.username,
        type: user.type,
        followersCount,
        userId: user.userId,
        avatarLink: user.avatarLink,
        dateCreated: new Date()
      };
      newData = { ...newData, ...userNew };
      // console.log(newData);
      const { data } = await dataService.postData("user/create", newData);
      console.log(data.body);
      setUser(data.body);
      toast('Profile updated!', {
        className: classes.success
      });
      // history.push(`/profile/${window.btoa(user.userId)}`);
    } catch (e) {
      toast.error("Something went wrong. Please try later!");
    }
  };
  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        {`${user.firstName} edit your profile here...`}
      </Typography>
      <br />

      <br />

      <form onSubmit={handleSubmit} autoComplete="off">
        
        <TextForm
          label="First Name"
          fullWidth={true}
          type="text"
          name="firstName"
          required={true}
          value={userNew.firstName}
          onChange={handleChange}
        />
        <br/>
        <TextForm
          label="Last Name"
          fullWidth={true}
          type="text"
          name="lastName"
          required={true}
          value={userNew.lastName}
          onChange={handleChange}
        />
        <br />
        <TextForm
          label="Email"
          fullWidth={true}
          type="email"
          name="email"
          required={true}
          value={userNew.email}
          onChange={handleChange}
        />
        <br />
        <TextForm
          label="Password"
          fullWidth={true}
          type="password"
          name="password"
          required={true}
          value={userNew.password}
          onChange={handleChange}
        />
        <br/>
        <TextForm
          label="A line about you"
          fullWidth={true}
          type="text"
          name="about"
          required={true}
          value={userNew.about}
          onChange={handleChange}
        />
        <br />
        {/* <SelectForm
          label="I am a..."
          name="type"
          value={userNew.type}
          onChange={handleChange}
          options={typeOptions}
        /> */}
        <br />

        <Button style={buttonStyleOpen} type="submit">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default EditProfile;
