import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

import VideoPlayer from "./videoPlayer";
import dataServices from "../services/dataServices";
import { storageURL } from "../config/storage";
import BottomNav from "./common/bottomNav";
import styles from "../styles/contentPage";
import QueuePlaylist from "./queuePlaylist";

const ContentPage = (props) => {
  const [content, setContent] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const contentId = window.atob(props.match.params.contentId);
  const { currentUser } = props;
  const history = useHistory();

  React.useEffect(() => {
    const fetchContent = async () => {
      const { data } = await dataServices.getData("content/withUser", {
        contentId: contentId,
      });
      // console.log("content data", data.body);
      console.log("Current user", currentUser);
      setContent(data.body);
      setLoading(false);
    };
    fetchContent();
  }, [currentUser, content.userId, contentId]);

  const handleUserClick = () => {
    return history.push(`/profile/${window.btoa(content.userId)}`);
  };
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={9} lg={9}>
          {loading ? (
             <Skeleton animation="wave" variant="rect" height={600} />
          ) : (
            <VideoPlayer
              url={storageURL + content.mediaLink}
              thumbnailLink={storageURL + content.thumbnailLink}
              width="800"
              height="500"
            />
          )}
          <BottomNav
            data={{
              followerId: currentUser.userId,
              followedId: content.userId,
              isFollowedByUser: content.isFollowedByUser,
              isLikedByUser: content.isLikedByUser,
              contentId: contentId,
              likes: content.likes,
              followers: content.followers,
            }}
          />
          <br />
          <Grid container spacing={6}>
            <Grid item xs={12} md={3} lg={3}>
              <div style={{ display: "block" }}>
                <Button onClick={handleUserClick}>
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <img
                      style={styles.profilePic}
                      src={storageURL + content.pageAvatar}
                      alt="profile"
                    />
                  )}
                  {loading ? (
                    <>
                      <Skeleton
                        animation="wave"
                        height={10}
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton animation="wave" height={10} width="80%" />
                    </>
                  ) : (
                    <Typography variant="h6" style={styles.title}>
                      {content.username}
                    </Typography>
                  )}
                </Button>
              </div>
              {/* <Button style={buttonStyleOpen}>Be a fan</Button> */}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="h4" style={styles.title}>
                {content.title}
              </Typography>
              <br />
              <Typography variant="h6" style={styles.title}>
                {content.caption}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <QueuePlaylist removeContentId={contentId} user={currentUser} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentPage;
