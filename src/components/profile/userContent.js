import React from "react";
import { Grid, Typography, Container } from "@material-ui/core";

import CardComponent from "../common/cardComponent";
import { storageURL } from "../../config/storage";

const UserContent = ({ content, onClick }) => {
  return (
    <Container maxWidth="xl">
      {content && content.length === 0 && (
        <Typography variant="h5">Ooops! No uploads yet.</Typography>
      )}

      <Grid container spacing={6}>
        {content &&
          content.map((c) => (
            <Grid item xs={12} md={4} lg={4} key={c.title}>
              <CardComponent
                data={c}
                primaryData={c.title}
                tag={`${c.likesCount} likes`}
                onClick={onClick}
                image={storageURL + c.thumbnailLink}
                width={300}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default UserContent;
