import React from "react";
import { Container, Grid } from "@material-ui/core";

import FirstPhase from "./firstPhase";
import SecondPhase from "./secondPhase";
import dataService from "../../../services/dataServices";
import { toast } from "materialize-css";
import { Link } from "react-router-dom";
import colors from "../../../config/colors";

const Signup = () => {
  const [formValues, setFormValues] = React.useState({});
  const [nextTab, setNextTab] = React.useState(1);

  const handleFirstPhaseSubmit = (values) => {
    setFormValues(values);
    setNextTab(2);
  };

  const handleSecondPhaseSubmit = async (values) => {
    console.log(values);
    const userData = { ...formValues, ...values, followersCount: 0 };
    console.log(userData);
    try {
      const { data } = await dataService.postData('user/create', userData);

      localStorage.setItem('user', JSON.stringify(data.body));
      
      window.location = '/uploadProfilePic';
  }
  catch (e) {
      toast.error('Something went wrong');
  }

  };
 

  return (
    <Container maxWidth="xs">
      {nextTab === 1 ? (
        <FirstPhase onSubmit={handleFirstPhaseSubmit} />
      ) : (
        <SecondPhase onSubmit={handleSecondPhaseSubmit} />
        )}
      
      <br/>
      <br/>
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

export default Signup;
