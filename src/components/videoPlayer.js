import React from 'react'
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';


const styles = makeStyles(theme => ({
  playerWrapper: {
    position: "relative",
    paddingTop: '56.25 %'
}
  ,
  reactPlayer: {
    position: "absolute",
    top: 0,
    left: 0
  }
}));
const VideoPlayer = ({ url, thumbnailLink }) => {
  const classes = styles();
  return (
    <div className={['player - wrapper', classes.playerWrapper]}>
      <ReactPlayer url={url}
        className={['react-player', classes.reactPlayer]}
        playing
        controls
        light={thumbnailLink}
        width='300px'
        height='180px'
      />
    </div>

  
  )
}
export default VideoPlayer
