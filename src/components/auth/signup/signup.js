import React from "react";
import { Container } from "@material-ui/core";

import FirstPhase from "./firstPhase";
import SecondPhase from "./secondPhase";
import dataService from "../../../services/dataServices";
import { toast } from "materialize-css";

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
    </Container>
  );
};

export default Signup;
