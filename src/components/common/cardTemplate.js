import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import darkTheme from "../../config/themes/dark";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: darkTheme.backgroundCard,
    color: darkTheme.textColor,
  },
  content: {
    color: darkTheme.textColor,
  },
  subheader: {
    color: darkTheme.textColor,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function CardTemplate({
  avatar,
  title,
  subheader,
  text,
  onClick,
  data,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Button onClick={() => onClick(data)}>
            {" "}
            <Avatar alt="" src={avatar} />
          </Button>
        }
        title={title}
        subheader={subheader}
      />
      {text && (
        <CardContent className={classes.content}>
          <Typography variant="body2" component="p">
            {text}
          </Typography>
        </CardContent>
      )}

      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
