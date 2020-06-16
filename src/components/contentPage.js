import React from "react";
import { Container, Grid, Button, Typography, StylesProvider } from "@material-ui/core";

import VideoPlayer from "./videoPlayer";
import dataServices from "../services/dataServices";
import { storageURL } from "../config/storage";
import BottomNav from './common/bottomNav';
import styles from '../styles/contentPage';
import { buttonStyleClose, buttonStyleOpen } from "../config/buttonStyle";
import Feed from "./feed";
import QueuePlaylist from "./queuePlaylist";

const ContentPage = (props) => {
  const [content, setContent] = React.useState({});
  const { contentId } = props.match.params;
  const { currentUser } = props;

  React.useEffect(() => {
    const fetchContent = async () => {
      const { data } = await dataServices.getData("content/withUser", {
        contentId: contentId,
      });
      console.log("content data", data.body);
      setContent(data.body);
    };
    fetchContent();
  }, [contentId]);
    
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={9} lg={9}>
          <VideoPlayer
            url={storageURL + content.mediaLink}
            thumbnailLink={storageURL + content.thumbnailLink}
            width="800"
            height="500"
                  />
          <BottomNav/>
                  <br />
      <Grid container spacing={6}>
                  
                      <Grid item xs={12} md={3} lg={3}>
                          <img style={styles.profilePic} src={storageURL + content.pageAvatar} alt='profile'/>
                          <Typography variant='h6' style={styles.title}>
                             {content.username}
                          </Typography>   
                          {/* <Button style={buttonStyleOpen}>Be a fan</Button> */}
                      </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                  <Typography variant='h4' style={styles.title}>
                  {content.title}
              </Typography>
              <br />
              <Typography variant='h6' style={styles.title}>
                  {content.caption}
              </Typography>   
                  </Grid>
                      </Grid>
        </Grid>
              <Grid item xs={12} md={3} lg={3}>
          <QueuePlaylist
            removeContentId={contentId}
            user={currentUser}
          />
              </Grid>
             
          </Grid>
         
    </Container>
  );
};

export default ContentPage;
