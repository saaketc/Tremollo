import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import SelectForm from "../../common/selectForm";
import TextForm from "../../common/textForm";
import colors from "../../../config/colors";
import logo from "../../../logo/logo_lite_crop.png";
import { buttonStyleOpen } from "../../../config/buttonStyle";

const genderOptions = [
  { value: "F", label: "Female" },
  { value: "M", label: "Male" },
];
const typeOptions = [
  { value: "0", label: "Listener" },
  { value: "1", label: "Guitarist" },
  { value: "2", label: "Pianist" },
  { value: "3", label: "Drummer" },
  { value: "4", label: "Singer" },
  { value: "5", label: "Disco Jockie" },
  { value: "6", label: "Others" },
];

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
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      about: "",
      type: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      onSubmit(values);
    },
  });

  return (
    <Container>
      <div className="form-div">
        <Typography variant="h5" className={classes.title}>
          Share your musical creativity !
        </Typography>
        <br />

        <br />

        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <TextForm
            label="First Name"
            fullWidth={true}
            type="text"
            name="firstName"
            required={true}
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <br />
          <TextForm
            label="Last Name"
            fullWidth={true}
            type="text"
            name="lastName"
            required={true}
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          <br />

          <TextForm
            label="Date of Birth"
            fullWidth={true}
            type="date"
            name="dateOfBirth"
            required={true}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
          />
          <br />

          <SelectForm
            label="Gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            options={genderOptions}
          />
          <br />

          <TextForm
            label="A line about you"
            fullWidth={true}
            type="text"
            name="about"
            required={true}
            value={formik.values.about}
            onChange={formik.handleChange}
          />
          <br />
          <SelectForm
            label="I am a..."
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            options={typeOptions}
          />
          <br />

          <Button style={buttonStyleOpen} type="submit">
            Create account
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default FirstPhase;
