import React from "react";
import Grid from '@material-ui/core/Grid';
import CardComponent from "./common/cardComponent";
import { Typography, Container } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';

import dataService from "../services/dataServices";
import { randInt } from "../utils/utilfunctions";
import playlistIllus from "../illustrations/playlistPage.svg";
import t1 from '../illustrations/thumbnail.svg';
import t2 from '../illustrations/thumbnail_2.svg';
import t3 from '../illustrations/thumbnail_3.svg';
import { createSlug } from '../utils/utilfunctions';

const thumbnail = [t1, t2, t3];
const styles = makeStyles(theme => ({
  heading: {
    fontWeight: '500'
  }
}));
const storageURL = 'https://eddy-bucket-0-1.s3.ap-south-1.amazonaws.com/';

const UserPlaylist = (props) => {
  const [playlist, setPlaylist] = React.useState();
  const classes = styles();

  React.useEffect(() => {
    //making api call to fetch current user playlist
    const fetchPlaylist = async () => {
      const { data } = await dataService.getData("user/playlist", {
        userId: props.user.userId,
      });
      console.log(data.body);
      setPlaylist(data.body.reverse());
    };
    fetchPlaylist();
  }, [props.user.userId]);

  const handlePlaylistClick = (data) => {
    return props.history.push(`/myPlaylist/${createSlug(data.name)}`, data);
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant='h3' className={classes.heading}>Enjoy your Playlist {props.user.firstName}!</Typography>
      <br/>
          <br />
          <Grid container spacing={2}>
      {playlist && playlist.map((p) => (
       

          <Grid item xs={12} lg={4} md={4}>
            <CardComponent
              data={p}
              property="name"
              secondaryData={`${p.contents.length} songs`}
              image={p.contents.length > 0 ?
                storageURL + p.contents[randInt(0, p.contents.length - 1)].thumbnailLink
                : thumbnail[randInt(0,2)]}
              onClick={handlePlaylistClick}
            />
          </Grid> 

      ))}
          </Grid>

     </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <img src={playlistIllus} alt="playlist" />
        </Grid>
        
        </Grid>
    </Container>
  );
};

export default UserPlaylist;
