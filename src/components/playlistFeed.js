import React from 'react'
import CardComponent from './common/cardComponent';
import { Typography, Container, Grid } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import playlistIllus2 from "../illustrations/playlistPage2.svg";
import { removeSlug } from '../utils/utilfunctions';

const storageURL = 'https://eddy-bucket-0-1.s3.ap-south-1.amazonaws.com/';

const styles = makeStyles(theme => ({
    heading: {
        fontWeight: '500'
    }
}));
const PlaylistFeed = (props) => {
    const { playlistName } = props.match.params;
    const { contents } = props.location.state;
    const classes = styles();
    const history = useHistory();
    
    const handleAlbumClick = (content) => {
        return history.push(`/content/${window.btoa(content.contentId)}`);

    }
  return (
      <Container>
          <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={6}>
                  <Typography variant='h3' className={classes.heading}>{`In ${removeSlug(playlistName)}`}</Typography>
                  <br/>
                  <br/>
          <Grid container spacing={6}>
              {contents.map(c => (
                  <Grid item xs={12} lg={6} sm={6} md={6}>
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
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                  <img src={playlistIllus2} alt="playlist" />
              </Grid>
              </Grid>
              
      </Container>
  )
}

export default PlaylistFeed
