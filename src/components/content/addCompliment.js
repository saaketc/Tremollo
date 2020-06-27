import React from "react";
import TextForm from "../common/textForm";
import dataServices from "../../services/dataServices";
import { toast } from "react-toastify";
import { Button, Container, Grid } from "@material-ui/core";
import { buttonStyleOpen } from "../../config/buttonStyle";

const AddCompliment = ({ complimentingUser, contentId, postSubmit  }) => {
  const [compliment, setCompliment] = React.useState("");

  const handleChange = ({ currentTarget }) => {
    setCompliment(currentTarget.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let text = compliment.trim();
      if (text === '')
        return;
      const toSubmit = {
        contentId,
        text,
        userId: complimentingUser.userId,
      };
      const { data } = await dataServices.postData(
        "content/comments",
        toSubmit
      );
      setCompliment("");
        postSubmit(data.body);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <Container>
      <form onSubmit={handleSubmit} >
       <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
          <TextForm
          label={`Write a compliment as ${complimentingUser.username}`}
          type="text"
          name="compliment"
          fullWidth
          placeholder={`Write a compliment as ${complimentingUser.username}`}
          value={compliment}
          onChange={handleChange}
              />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
          
            <Button type='submit' style={buttonStyleOpen}>Add</Button>
            </Grid>
          </Grid>
      </form>
    </Container>
  );
};

export default AddCompliment;
