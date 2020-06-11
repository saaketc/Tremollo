import React, { useState, useEffect } from 'react';
import Playlist from './playlist';
import UIcard from './common/feedUICard';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import dataService from '../services/dataServices';
import { toast } from 'react-toastify';
import { storageURL } from '../config/storage';
import CardComponent from './common/cardComponent';

const Feed = (props) => {

  const { user } = props;
  const [feed, setFeed] = useState([]);
  // const [playlist, setPlaylist] = useState([]);
  // const [playlist, setPlaylist] = useState(play);
  // const [currentUser, setCurrentUser] = useState(user);
  
  useEffect(() => {
    async function fetchFeedData() {
      try {
        
        const params = {
          pageNumber: 1,
          rowCount: 10,
          userId: props.user.userId
        }
        const { data } = await dataService.getData('feed', params);
        // Promise.all([dataService.getData('feed', params), dataService.getData('user/playlist', { userId: 1 })])
        //   .then(([resFeed, resPlaylist]) => {
        //     // console.log(data);
        //     // setFeed(data.body);
        //     // console.log(resFeed.data);
        //     console.log(resPlaylist.data.body);
        //     setFeed(resFeed.data.body);
        //     setPlaylist(resPlaylist.data.body);

        //   })
        console.log(data.body);
        setFeed(data.body); 
         
      
      }
      
      catch (e) {
        console.log(e);
        // toast.error('Something went wrong');
      }
    }
    fetchFeedData();

  }, [props.user]);
  return (
    <Container>
    <Grid container spacing={6}>
      {feed.map(f => (
        <Grid item xs={12} lg={4} sm={6}>
          <CardComponent
            data={f}
            property='title'
            secondaryData={f.caption}
            image={storageURL + f.thumbnailLink}
          />
          <br />
        
          
          </Grid>
      ))}
      </Grid>
      </Container>
  )
}
    
    export default Feed
