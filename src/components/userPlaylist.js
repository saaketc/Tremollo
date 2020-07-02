import React from "react";
import Grid from '@material-ui/core/Grid';
import CardComponent from "./common/cardComponent";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import dataService from "../services/dataServices";
import { randInt, decode } from "../utils/utilfunctions";
import playlistIllus from "../illustrations/playlistPage.svg";
import t1 from '../illustrations/thumbnail.svg';
import t2 from '../illustrations/thumbnail_2.svg';
import t3 from '../illustrations/thumbnail_3.svg';
import { createSlug } from '../utils/utilfunctions';
import darkTheme from '../config/themes/dark';
import { storageURL } from "../config/storage";

const thumbnail = [t1, t2, t3];
const styles = makeStyles(theme => ({
  heading: {
    fontWeight: '500',
    color: darkTheme.textColor
  }
}));

const UserPlaylist = (props) => {
  const [playlist, setPlaylist] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const  userId  = decode(props.match.params.userId);
  const classes = styles();

  React.useEffect(() => {
    //making api call to fetch current user playlist
    const fetchPlaylist = async () => {
      const { data } = await dataService.getData("user/playlist", {
        userId,
      });
      console.log(data.body);
      setPlaylist(data.body.reverse());
      setLoading(false);
    };
    fetchPlaylist();
  }, [userId]);

  const handlePlaylistClick = (data) => {
    return props.history.push(`/myPlaylist/${props.match.params.userId}/${createSlug(data.name)}`, data);
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={8}>
          <Typography variant='h3' className={classes.heading}>
            {
              loading ?
                'Loading playlist...'
                :
                playlist.length > 0 ? 'Enjoy the playlist :)' : 'No playlist created yet :('
           }
            </Typography>
      <br/>
          <br />
          <Grid container spacing={2}>
      {playlist && playlist.map((p) => (
       

          <Grid item xs={12} lg={4} md={4}>
            <CardComponent
              data={p}
              primaryData={p.name}
              secondaryData={`${p.contents.length} songs`}
              image={p.contents.length > 0 ?
                storageURL + p.contents[randInt(0, p.contents.length - 1)].thumbnailLink
                : thumbnail[randInt(0,2)]}
            onClick={handlePlaylistClick}
            width = {100}
            />
          </Grid> 

      ))}
          </Grid>

     </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <img src={playlistIllus} alt="playlist" />
        </Grid>
        
        </Grid>
    </Container>
  );
};

export default UserPlaylist;
