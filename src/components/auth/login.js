import React from "react";
import dataService from "../../services/dataServices";
import Form from "../common/form";
import { toast } from "react-toastify";
import { setUser } from "../../services/userServices";
import "../../styles/auth.css";
import background from "../../illustrations/guitar.jpg";

const Login = (props) => {
  const { state } = props.location;
  const [logging, setLogging] = React.useState(false);

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const button = { type: "submit", label: "Login", color: "#bf2604" };

  const postSubmitLogic = async (submittedFormData) => {
    try {
      setLogging(true);
      const { data } = await dataService.postData(
        "user/login",
        submittedFormData
      );
      if (data.body === null) {
        return toast.error('Invalid email or password. Please check your credentials!');
      }
      setUser(data.body);
      window.location = state ? state : "/";
    } catch (e) {
      console.log(e.message);
      setLogging(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="container-bg">
        <img src={background} className="bg" alt="" />
      </div>
      <div className="form-login">
        <br/>
        <br/>
        <br/>
        <Form
          postSubmitLogic={postSubmitLogic}
          heading={
            state
              ? "Please login to access this content and much more!"
              : "Welcome back tremoller!"
          }
          fields={fields}
          login={true}
          redirectUrl={state}
          logging={logging}
          button={button}
        />
      </div>
    </>
  );
};

export default Login;
