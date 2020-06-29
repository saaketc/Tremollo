import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import dataService from '../services/dataServices';
import { storageURL } from '../config/storage';
import CardComponent from './common/cardComponent';
import { encode } from '../utils/utilfunctions';

const Feed = (props) => {
  const history = useHistory();
  // const { user } = props;
  const [feed, setFeed] = useState([]);
  // const [playlist, setPlaylist] = useState([]);
  // const [playlist, setPlaylist] = useState(play);
  // const [currentUser, setCurrentUser] = useState(user);
  
  useEffect(() => {
    async function fetchFeedData() {
      try {
        
        const params = {
          pageNumber: 1,
          rowCount: 30,
          userId: props.user.userId
        }
        const { data } = await dataService.getData('feed', params);
        console.log('feed', data.body);
        setFeed(data.body); 
         
      
      }
      
      catch (e) {
        console.log(e);
        // toast.error('Something went wrong');
      }
    }
    fetchFeedData();

  }, [props.user]);

  const handleAlbumClick = async data => {
    // alert('Clicked');
    return history.push(`/content/${encode(data.contentId)}`);
  }

  return (
   <Container maxWidth='100%'>
    <Grid container spacing={4}>
        {feed &&
          feed.map(f => (
        <Grid item xs={12} lg={3} md={3}>
          <CardComponent
            data={f}
            primaryData={f.title}
            secondaryData={`by ${f.username}`}
            onClick={handleAlbumClick}
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
