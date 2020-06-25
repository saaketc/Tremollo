import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import TextForm from "../../common/textForm";

import colors from "../../../config/colors";
import logo from "../../../logo/logo_lite_crop.png";
import { buttonStyleOpen } from "../../../config/buttonStyle";
import { Link } from "react-router-dom";

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
  left: {
    alignText: "left",
  },
}));

const FirstPhase = ({ onSubmit }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Container>
      {/* <img src={logo} alt='tremollo music'/> */}
      <Typography variant="h5" className={classes.title}>
        Join tremollo to explore musical creativity!
      </Typography>
      <br />

      <br />

      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextForm
          label="Username"
          fullWidth={true}
          type="text"
          name="username"
          required={true}
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <br />
        <TextForm
          label="Email"
          fullWidth={true}
          type="email"
          name="email"
          required={true}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <br />

        <TextForm
          label="Password"
          
          fullWidth={true}
          type="password"
          name="password"
          required={true}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <br />

        <Button style={buttonStyleOpen} type="submit">
          Continue
        </Button>
      </form>
      <br/>
      <br />
      
      <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/auth/login" variant="body2" style={{color: colors.primary}}>
                    Already on tremollo? Login instead
                  </Link>
                </Grid>
              </Grid>
    </Container>
  );
};

export default FirstPhase;
