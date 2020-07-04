import React from 'react'
import { storageURL } from '../../config/storage'
import { Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import darkTheme from "../../config/themes/dark";
import colors from '../../config/colors';

const useStyles = makeStyles((theme) => ({
  title: {
    color: darkTheme.textColor,

  },
  secondary: {
    color: colors.secondary
  }
}));

const FeedItem = ({ item }) => {
  const classes = useStyles();

  return (
    <div className='card'>
      <div className='card-inner'>
        <div className='card-front'>
          <img src={storageURL + item.thumbnailLink} alt='' />
        </div>
        <div className='card-back'>
          <Typography variant='h6' className={classes.title}>{item.title}</Typography>
          <Typography variant='subtitle1' className={classes.secondary}>{`by ${item.username}`}</Typography>
          <Typography variant='subtitle2' style={{color: colors.primary}}>{`${item.likes} likes`}</Typography>
        </div>
      </div>
    </div>
  )
}

export default FeedItem
