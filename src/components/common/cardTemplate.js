import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { extraSmallPicStyle } from '../../config/imageStyles';
import  darkTheme  from '../../config/themes/dark';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
        maxWidth: 345,
    backgroundColor: darkTheme.backgroundCard,
      color: darkTheme.textColor
  },
  content: {
    color: darkTheme.textColor
    
  },
  subheader: {
    color: darkTheme.textColor
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
 
}));

export default function CardTemplate({avatar, title, subheader, text, onClick, data}) {
    const classes = useStyles();
    
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
           <Button  onClick={()=>onClick(data)} > <Avatar alt="" src={avatar} /></Button>
        }
        title={title}
        subheader={subheader}
       
      />
     
      <CardContent className={classes.content}>
        <Typography variant="body2" component="p">
         {text}
              </Typography>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
       </Card>
  );
}