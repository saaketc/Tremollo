import React from 'react'
import CardComponent from './common/cardComponent';
import { Typography, Container, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import { removeSlug } from '../utils/utilfunctions';
import darkTheme from '../config/themes/dark';
import { storageURL } from '../config/storage';

const styles = makeStyles(theme => ({
    heading: {
        fontWeight: '500',
        textAlign: 'center',
        color: darkTheme.textColor
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
      <Container maxWidth='xl'>
         
                  <Typography variant='h3' className={classes.heading}>{removeSlug(playlistName)}</Typography>
                  <br/>
                  <br/>
          <Grid container spacing={6}>
              {contents.map(c => (
                  <Grid item xs={12} lg={3} md={3}>
                      <CardComponent
                          data={c}
                          primaryData={c.title}
                          secondaryData={c.username}
                          onClick={handleAlbumClick}
                          image={storageURL + c.thumbnailLink}
                          width={100}
                      />
                      <br />
                    </Grid>

              ))}
                  </Grid>
            
           
              
      </Container>
  )
}

export default PlaylistFeed
