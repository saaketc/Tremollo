import React from "react";
import CardComponent from "./common/cardComponent";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { removeSlug, encode } from "../utils/utilfunctions";
import darkTheme from "../config/themes/dark";
import { storageURL } from "../config/storage";
import { buttonStyleClose, buttonStyleOpen } from "../config/buttonStyle";

const styles = makeStyles((theme) => ({
  heading: {
    fontWeight: "600",
    textAlign: "left",
    color: darkTheme.textColor,
  },
}));
const PlaylistFeed = (props) => {
  const { playlistName } = props.match.params;
  const { contents } = props.location.state;
  const classes = styles();
  const history = useHistory();

  const handleAlbumClick = (content) => {
    return history.push(`/content/${encode(content.contentId)}`);
  };
  return (
    <Container maxWidth="xl">
      <Button style={buttonStyleOpen} onClick={() => window.history.back()}>
        Back
      </Button>
      <br />
      <br />
      <Typography variant="h3" className={classes.heading}>
        {removeSlug(playlistName)}
      </Typography>
      <br />
      <Grid container spacing={6}>
        {contents.map((c) => (
          <Grid item xs={12} lg={2} md={2}>
            <CardComponent
              data={c}
              primaryData={c.title}
              secondaryData={c.username}
              onClick={handleAlbumClick}
              image={storageURL + c.thumbnailLink}
            />
            <br />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PlaylistFeed;
