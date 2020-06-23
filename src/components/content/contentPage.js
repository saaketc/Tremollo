import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

import VideoPlayer from "../videoPlayer";
import dataServices from "../../services/dataServices";
import { storageURL } from "../../config/storage";
import BottomNav from "../common/bottomNav";
import styles from "../../styles/contentPage";
import QueuePlaylist from "../queuePlaylist";
import { toast } from "react-toastify";
import Signup from "../auth/signup/signup";
import Follow from "../socialInteraction/follow";
import Compliments from "./compliments";
import ContentLikes from "./contentLikes";
import { smallPicStyle } from "../../config/imageStyles";
import CenteredTabs from "../common/centredTabs";

const ContentPage = (props) => {
  const [content, setContent] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);

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
        setContent(data.body);
        setLoading(false);
      } catch (e) {
        toast.error("Something went wrong...");
      }
    };
    fetchContent();
  }, [contentId]);

  const handleUserClick = () => {
    return history.push(`/profile/${window.btoa(content.userId)}`);
  };
  const afterTabSet = (value) => {
    setTab(value);
  };

  return (
    <Container>
      {currentUser ? (
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
                        width={100}
                        height={100}
                      />
                    ) : (
                      <img
                        style={smallPicStyle}
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
              
              </Grid>
              <Grid item xs={12} md={5} lg={5}>
                <Typography variant="h4" style={styles.title}>
                  {content.title}
                </Typography>
                
                <Typography variant="h6" style={styles.title}>
                  {content.caption}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
              <Follow
                  followerId={currentUser.userId}
                  followedId={content.userId}
                  isFollowedByUser={content.isFollowedByUser}
                />
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            {/* Compliments component */}
            <CenteredTabs
              labels={["Compliments", "Liked by"]}
              afterTabSet={afterTabSet}
              maxWidth={830}
            />
            <br />
            <br />
            {tab === 0 && <Compliments contentId={contentId} currentUser={currentUser}/>}
            {tab === 1 && <ContentLikes contentId={contentId} />}

            {/* <Grid item xs={12} md={6} lg={6}>
          <ContentLikes />
        </Grid> */}
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <QueuePlaylist removeContentId={contentId} user={currentUser} />
          </Grid>
        </Grid>
      ) : (
        <Signup />
      )}
    </Container>
  );
};

export default ContentPage;