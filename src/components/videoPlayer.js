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
const VideoPlayer = ({ url, thumbnailLink, width, height }) => {
  const classes = styles();
  return (
    <div className={['player - wrapper', classes.playerWrapper]}>
      <ReactPlayer url={url}
        className={['react-player', classes.reactPlayer]}
        playing={true}
        controls
        width={`${width}px`}
        height={`${height}px`}
        config={{ file: { 
          attributes: {
            controlsList: 'nodownload'  
          }
      }}}
      />
    </div>

  
  )
}
export default VideoPlayer
