import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    maxWidth: 150,
    borderRadius: "30",
    maxHeight: 150,
  },
  media: {
    height: 150,
  },
});

export default function MediaCard({ imageTitle, image, onClick, data }) {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      onClick={() => (onClick ? onClick(data) : null)}
    >
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={imageTitle} />
      </CardActionArea>
    </Card>
  );
}
