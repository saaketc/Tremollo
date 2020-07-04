import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button } from "@material-ui/core";

import colors from "../../config/colors";
import darkTheme from "../../config/themes/dark";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: darkTheme.backgroundCard,
    width: 200,
    height: 230,
  },

  content: {
    color: darkTheme.textColor,
    textTransform: "none",
    textAlign: "left",
    width: 200,
    height: 230,
  },
  cover: {
    width: 200,
    height: 100,
  },

  playIcon: {
    height: 50,
    width: 50,
    color: darkTheme.primary,
  },
  secondary: {
    color: colors.secondary,
  },
  tag: {
    color: colors.primary,
  },
}));

export default function CardComponent({
  data,
  primaryData,
  secondaryData,
  tag,
  image,
  onClick,
  tooltip
}) {
  const classes = useStyles();

  return (
    <Button>
      <Card
        className={classes.root}
        onClick={() => (onClick ? onClick(data) : null)}
      >
        <div>
          <CardMedia
            className={classes.cover}
            image={image}
            title={tooltip}
          />
          <CardContent className={classes.content}>
            <Typography component="h7" variant="h7">
              {primaryData}
            </Typography>
            <br />
            <Typography variant="subtitle2" className={classes.secondary}>
              {secondaryData}
            </Typography>
            {tag && (
              <Typography
                variant="subtitle1"
                style={{ textAlign: "left" }}
                className={classes.tag}
              >
                {tag}
              </Typography>
            )}
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
          </div>
        </div>
      </Card>
    </Button>
  );
}
