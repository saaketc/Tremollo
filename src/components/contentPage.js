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
import { buttonStyleOpen } from "../config/buttonStyle";
import { toast } from "react-toastify";
import Signup from "./auth/signup/signup";
import Follow from "./socialInteraction/follow";

const ContentPage = (props) => {
  const [content, setContent] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const contentId = window.atob(props.match.params.contentId);
  const { currentUser } = props;
  const history = useHistory();

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await dataServices.getData("content/withUser", {
          contentId: contentId,
        });
        // console.log("content data", data.body);
        console.log("Current user", currentUser);
        setContent(data.body);
        setLoading(false);
      }
      catch (e) {
        toast.error('Something went wrong...');
      }
    };
    fetchContent();
  }, [currentUser, content.userId, contentId]);

  const handleUserClick = () => {
    return history.push(`/profile/${window.btoa(content.userId)}`);
  };
  return (
    <Container>
      {
        currentUser ?
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
              followerId: currentUser.userId ,
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
                      width={100}
                      height={100}
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
                        height={50}
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton animation="wave" height={50} width="80%" />
                    </>
                  ) : (
                    <Typography variant="h6" style={styles.title}>
                      {content.username}
                    </Typography>
                  )}
                </Button>
                  </div>

                  {/* Follow component */}
              <Follow
            followerId={currentUser.userId}
            followedId={content.userId}
            isFollowedByUser={content.isFollowedByUser}
                  />
                  
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
          :
          <Signup/>
      }
    </Container>
  );
};

export default ContentPage;
