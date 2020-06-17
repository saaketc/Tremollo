
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import colors from '../../config/colors';
import { Button } from '@material-ui/core';
import darkTheme from '../../config/themes/dark';

const useStyles = makeStyles((theme) => ({
  root: {
        display: 'flex',
    backgroundColor: darkTheme.backgroundCard,
      // maxWidth:300
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
      flex: '1 0 auto',
      color: darkTheme.textColor
  },
  cover: {
      width: 200,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    color: darkTheme.textColor
  },
  playIcon: {
    height: 50,
      width: 50,
    color: darkTheme.primary
  },
}));


export default function CardComponent({ data, primaryData, secondaryData, image, onClick, width })
{
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Button>
    <Card className={classes.root} onClick={()=> onClick ? onClick(data) : null}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
                  {primaryData}   
                  </Typography>
          <Typography variant="subtitle1">
           {secondaryData}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          {/* <IconButton aria-label="previous" style={{color: colors.primary}}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton> */}
          <IconButton aria-label="play/pause" onClick={() => onClick ? onClick(data) : null}>
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          {/* <IconButton aria-label="next"  style={{color: colors.primary}}>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
        </div>
      </div>
      <CardMedia
          className={classes.cover}
        style={{width: width ? width : 200 }}
        image={image}
        title={primaryData}
      />
      </Card>
      </Button>
  );
}