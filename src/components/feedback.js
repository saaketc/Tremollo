import React from "react";
import { Grid } from "@material-ui/core";
import feedback from "../illustrations/feedback.svg";

const Feedback = () => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} lg={4}>
          <img src={feedback} alt="feedback" width="100%" height="100%" />
        </Grid>

          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdAjcCoIxVJ5tQP6DAC_b_3InFLdlba04qSSsWBtLD4T4FngQ/viewform?embedded=true"
            width="640"
            height="1269"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            title="feedback"
          >
            Loading…
          </iframe>
      </Grid>
    </div>
  );
};

export default Feedback;
