import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import VideoPlayer from "../videoPlayer";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    borderRadius: "30",
    maxHeight: "100%",
  },
  media: {
    height: 400,
  },
});

export default function MediaCard({
  data,
  primaryProperty,
  secProperty,
  message1,
  message2,
  url,
  thumbnailLink,
  onClick,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={()=> onClick ? onClick(data) : null}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component={(props) => (
            <VideoPlayer {...props} url={url} thumbnailLink={thumbnailLink} />
          )}
          title={data[primaryProperty]}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data[primaryProperty]}
          </Typography>
          <Typography gutterBottom variant="h7" component="h4">
            {message1}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data[secProperty]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography gutterBottom variant="h7" component="h4">
          {message2}
        </Typography>
      </CardActions>
    </Card>
  );
}
