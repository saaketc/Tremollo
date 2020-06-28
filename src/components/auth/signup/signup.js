import React from "react";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import FirstPhase from "./firstPhase";
import SecondPhase from "./secondPhase";
import dataService from "../../../services/dataServices";
import { toast } from "materialize-css";
import "../../../styles/signup.css";
import background from "../../../illustrations/background.svg";

const Signup = (props) => {
  const [formValues, setFormValues] = React.useState({});
  const [nextTab, setNextTab] = React.useState(1);
  const history = useHistory();

  const { state } = props.location;

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
      
      history.push('/uploadProfilePic', {redirectUrl: state});
  }
  catch (e) {
      toast.error('Something went wrong');
  }

  };
 

  return (
    <Container maxWidth="xs">

    <div className='container-bg'>
      <img src={background} className='bg' alt=''/>
   </div>
        
      {nextTab === 1 ? (
        <FirstPhase onSubmit={handleFirstPhaseSubmit} />
      ) : (
        <SecondPhase onSubmit={handleSecondPhaseSubmit} />
        )}
      
      <br/>
      <br/>
        
      </Container>
  );
};

export default Signup;
