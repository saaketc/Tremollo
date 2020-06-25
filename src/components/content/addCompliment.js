import React from "react";
import TextForm from "../common/textForm";
import dataServices from "../../services/dataServices";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { buttonStyleOpen } from "../../config/buttonStyle";

const AddCompliment = ({ complimentingUser, contentId, postSubmit  }) => {
  const [compliment, setCompliment] = React.useState("");

  const handleChange = ({ currentTarget }) => {
    setCompliment(currentTarget.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const toSubmit = {
        contentId,
        text: compliment,
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
    <div>
      <form onSubmit={handleSubmit}>
        <TextForm
          label={`Write a compliment as ${complimentingUser.username}`}
          type="text"
          name="compliment"
          fullWidth
          placeholder={`Write a compliment as ${complimentingUser.username}`}
          value={compliment}
          onChange={handleChange}
              />
              <br/>
              <Button type='submit' style={buttonStyleOpen}>Add</Button>
      </form>
    </div>
  );
};

export default AddCompliment;
