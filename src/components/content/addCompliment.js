import React from "react";
import TextForm from "../common/textForm";
import dataServices from "../../services/dataServices";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { buttonStyleOpen } from "../../config/buttonStyle";

const AddCompliment = ({ complimentingUserId, contentId, postSubmit  }) => {
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
        userId: complimentingUserId,
      };
      const { data } = await dataServices.postData(
        "content/comments",
        toSubmit
        );
        postSubmit(data.body);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextForm
          label="Add a compliment"
          type="text"
          name="compliment"
          required={true}
          fullWidth
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
