import React from "react";
import { Container, Grid, Button, Typography, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

import VideoPlayer from "../videoPlayer";
import dataServices from "../../services/dataServices";
import { storageURL } from "../../config/storage";
import BottomNav from "../common/bottomNav";
import styles from "../../styles/contentPage";
import QueuePlaylist from "../queuePlaylist";
import { toast } from "react-toastify";
import Follow from "../socialInteraction/follow";
import Compliments from "./compliments";
import ContentLikes from "./contentLikes";
import CenteredTabs from "../common/centredTabs";
import { encode, decode } from "../../utils/utilfunctions";
import { makeStyles } from "@material-ui/core/styles";
import darkTheme from "../../config/themes/dark";
import colors from "../../config/colors";

const useStyles = makeStyles((theme) => ({
  btn: {
    textTransform: "none",
  },
  skeleton: {
    backgroundColor: darkTheme.backgroundCard,
  },
  pic: {
    borderRadius: "50%",
    border: `1px solid ${colors.primary}`,
    width: 60,
    height: 60,
    verticalAlign: "middle",
  },
}));

const ContentPage = (props) => {
  const classes = useStyles();

  const [content, setContent] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);

  const contentId = decode(props.match.params.contentId);
  const { user: currentUser } = props;
  const history = useHistory();

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await dataServices.getData("content/withUser", {
          contentId: contentId,
          userId: currentUser.userId,
        });
        // console.log("content data", data.body);
        setContent(data.body);
        setLoading(false);
      } catch (e) {
        toast.error("Something went wrong...");
      }
    };
    fetchContent();
  }, [contentId, currentUser]);

  const handleUserClick = () => {
    return history.push(`/profile/${encode(content.userId)}`);
  };
  const afterTabSet = (value) => {
    setTab(value);
  };

  return (
    <Container>
      <br />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12} md={9} lg={9}>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.skeleton}
              height={500}
              width={800}
            />
          ) : (
            <VideoPlayer
              url={storageURL + content.mediaLink}
              thumbnailLink={storageURL + content.thumbnailLink}
              width="800"
              height="500"
            />
          )}
          {loading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.skeleton}
              height={50}
              width={800}
            />
          ) : (
            <BottomNav
              data={{
                followerId: currentUser.userId,
                followedId: content.userId,
                isFollowedByUser: content.isFollowedByUser,
                isLikedByUser: content.isLikedByUser,
                contentId: contentId,
                likes: content.likes,
              }}
            />
          )}

          <br />
          <Grid container spacing={4}>
            <Grid item xs={12} md={8} lg={8}>
              {
                !loading ? 
                <div>
                <Typography variant="h4" style={styles.title}>
                  {content.title}
                </Typography>
                <Typography variant="h6" style={styles.title}>
                  {content.caption}
                </Typography>
                  </div> :
                    <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.skeleton}
                    height={30}
                    width={400}
                  /> 
              }
            
              
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
            <div style={{ marginTop: "15px" }}>

              {
                !loading ?
                <Follow
                  followerId={currentUser.userId}
                  followedId={content.userId}
                  isFollowedByUser={content.isFollowedByUser}
                    />
                    :
                    <Skeleton
              animation="wave"
              variant="rect"
              className={classes.skeleton}
              height={50}
              width={130}
            /> 
              }
              </div>
             
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <div style={{ display: "block" }}>
                <Button className={classes.btn} onClick={handleUserClick}>
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      className={classes.skeleton}
                      width={60}
                      height={60}
                    />
                  ) : (
                    <Avatar
                      className={classes.pic}
                      src={storageURL + content.pageAvatar}
                      alt="profile"
                    />
                  )}
                  {loading ? (
                    <>
                      <Skeleton
                        animation="wave"
                        height={30}
                        width={100}
                        className={classes.skeleton}
                        style={{ marginBottom: 6, marginLeft: 6 }}
                      />
                    </>
                  ) : (
                    <Typography variant="h6" style={styles.title}>
                      {content.username}
                    </Typography>
                  )}
                </Button>
                {/* <p
                  style={{ color: colors.secondary, marginLeft: "10px" }}
                ></p> */}
              </div>

              {/* Follow component */}
            </Grid>
          </Grid>
          <br />

          {/* Compliments component */}
          <CenteredTabs
            labels={["Compliments", "Liked by"]}
            afterTabSet={afterTabSet}
            maxWidth={830}
          />
          <br />
          <br />
          {tab === 0 && (
            <Compliments contentId={contentId} currentUser={currentUser} />
          )}
          {tab === 1 && <ContentLikes contentId={contentId} />}
        </Grid>
        <Grid item xs={12} md={3} lg={3} style={{ paddingLeft: "120px" }}>
          <QueuePlaylist removeContentId={contentId} user={currentUser} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentPage;
