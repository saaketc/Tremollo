import React from "react";
import { Grid, Typography, Container } from "@material-ui/core";

import CardComponent from "../common/cardComponent";
import { storageURL } from "../../config/storage";
import { stringSlice } from "../../utils/utilfunctions";

const UserContent = ({ content, onClick, loading }) => {
  return (
    <Container maxWidth="xl">
      {(!loading && content.length === 0) && (
        <Typography variant="h5">Ooops! No uploads yet.</Typography>
      )}

      <Grid container spacing={2}>
        {content &&
          content.map((c) => (
            <Grid item xs={12} md={3} lg={3} key={c.title}>
              <CardComponent
                data={c}
                primaryData={stringSlice(c.title)}
                tag={`${c.likesCount} likes`}
                onClick={onClick}
                image={storageURL + c.thumbnailLink}
                width={200}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default UserContent;
