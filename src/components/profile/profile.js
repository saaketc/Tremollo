import React from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import dataService from "../../services/dataServices";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../config/colors";
import { storageURL } from "../../config/storage";

import { getUserType } from "../../utils/userFunctions";
import { buttonStyleClose, buttonStyleOpen } from "../../config/buttonStyle";
import CenteredTabs from "../common/centredTabs";
import UserContent from "./userContent";
import UserFollowers from "./userFollowers";
import UserFollowing from "./userFollowing";
import Skeleton from "@material-ui/lab/Skeleton";
import Follow from "../socialInteraction/follow";
import { decode, encode } from "../../utils/utilfunctions";
import { Link } from "react-router-dom";
import darkTheme from "../../config/themes/dark";

const useStyles = makeStyles((theme) => ({
  btn: buttonStyleClose,
  title: {
    fontWeight: "900",
    // color: colors.primary,
  },
  heading: {
    // color: colors.white
  },
  profilePic: {
    borderRadius: "50%",
    border: `2px solid ${colors.primary}`,
    width: 200,
    height: 200,
    verticalAlign: "middle",
    "&:hover": {
      opacity: 0.3,
    },
    padding: "5px",
  },
  middle: {
    transition: ".5s ease",
    opacity: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: " translate(" - (50 % ", ") - (50 % ")"),
    msTransform: "translate(" - (50 % ", ") - (50 % ")"),
    textAlign: "center",
    "&:hover": {
      opacity: 1,
    },
  },
  text: {
    // backgroundColor: "#4CAF50",
    // color: "white",
    fontSize: "16px",
    padding: "16px 32px",
  },
  space: {
    marginLeft: "10px",
  },
  skeleton: {
    backgroundColor: darkTheme.backgroundCard,
  },
}));

const Profile = (props) => {
  const [userStats, setUserStats] = React.useState({});
  const [userDetails, setUserDetails] = React.useState({});
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);
  const [isFollowedByUser, setIsFollowedByUser] = React.useState(0);

  const classes = useStyles();
  const history = useHistory();
  // const user = props.location.state;
  const { user: currentUser } = props;
  const userId = decode(props.match.params.userId);

  React.useEffect(() => {
    const userDetailsPromise = dataService.getData("user", {
      userId: userId,
    });

    const userPromise = dataService.getData("user/stats", {
      userId: userId,
    });

    const contentPromise = dataService.getData("user/content", {
      userId: userId,
    });
    Promise.all([userDetailsPromise, userPromise, contentPromise])
      .then(([userDetailsRes, userRes, contentRes]) => {
        console.log("user", userRes.data.body);
        // console.log("content", contentRes.data.body);

        setUserDetails(userDetailsRes.data.body);
        setLoading(false);
        setUserStats(userRes.data.body);
        setContent(contentRes.data.body);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleProfilePicClick = () => {
    return (window.location = `/uploadProfilePic?redirect=${window.location.href}`);
  };

  const handleEditClick = () => {
    return history.push("/edit", { followersCount: userStats.followers });
  };
  const handleUploadContent = () => {
    return history.push("/myMusic/upload");
  };

  const handleAlbumClick = async (data) => {
    return history.push(`/content/${encode(data.contentId)}`);
  };

  const handleFollows = (follows) => {
    setIsFollowedByUser(follows);
  };
  const afterTabSet = (value) => {
    setTab(value);
  };

  const handlePlaylistClick = () => {
    return props.history.push(`/playlist/${encode(userId)}`);
  };
  return (
    <Container>
      <br />
      <br />
      <Grid container spacing={6}>
        <Grid item xs={12} md={3} lg={3}>
          <Link
            onClick={() =>
              Number(currentUser.userId) === Number(userId)
                ? handleProfilePicClick()
                : null
            }
          >
            {loading ? (
              <Skeleton
                animation="wave"
                variant="circle"
                className={classes.skeleton}
                width={250}
                height={250}
              />
            ) : (
              <img
                src={storageURL + userDetails.avatarLink}
                alt="profile"
                className={classes.profilePic}
              />
            )}
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {loading ? (
            <Skeleton
              animation="wave"
              className={classes.skeleton}
              height={30}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <>
              <Typography variant="h4" style={{ fontWeight: "400" }}>
                {userDetails.username}
              </Typography>
              <Typography
                variant="h6"
                className={classes.heading}
                style={{ fontWeight: "300" }}
              >
                {` ${userDetails.firstName} ${userDetails.lastName} `}
              </Typography>
            </>
          )}

          {loading ? (
            <Skeleton
              animation="wave"
              className={classes.skeleton}
              height={30}
              width="40%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <>
              <Typography
                className={classes.title}
                variant="h8"
                style={{ fontWeight: "500", color: colors.secondary }}
              >
                {getUserType(userDetails.type)}
              </Typography>
              <br />
              <br />
              <Typography
                variant="h7"
                className={classes.heading}
                style={{ fontWeight: "400", color: colors.secondary }}
              >
                {userDetails.about}
              </Typography>
            </>
          )}

          <br />
          <br />
          {loading ? (
            <Skeleton
              animation="wave"
              className={classes.skeleton}
              height={30}
              width="40%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <Typography
              variant="h6"
              className={classes.title}
              style={{ fontWeight: "400" }}
            >
              {` ${userStats.uploads} Shots  |  ${userStats.followers} Fans  |  Fan of ${userStats.following} `}
            </Typography>
          )}

          <br />
          {Number(currentUser.userId) === Number(userId) ? (
            <div style={{ display: "block" }}>
              <Button onClick={handleEditClick} style={buttonStyleOpen}>
                Edit profile
              </Button>
              <Button
                style={buttonStyleClose}
                className={classes.space}
                onClick={handleUploadContent}
              >
                Upload music
              </Button>
            </div>
          ) : (
            <div>
              <Follow
                followerId={currentUser.userId}
                followedId={userId}
                isFollowedByUser={isFollowedByUser}
              />
              <Button
                onClick={handlePlaylistClick}
                style={buttonStyleClose}
                className={classes.space}
              >
                {loading
                  ? "Loading playlist..."
                  : `${userDetails.username}'s playlist`}
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
      <br />
      <br />
      <CenteredTabs
        labels={["Fans", "Shots", "Fan of"]}
        afterTabSet={afterTabSet}
      />
      <br />
      <br />

      <Grid container spacing={4}>
        {tab === 0 && (
          <UserFollowers
            userId={userId}
            currentUserId={currentUser.userId}
            isFollows={handleFollows}
          />
        )}

        {tab === 1 && (
          <UserContent onClick={handleAlbumClick} content={content.reverse()} />
        )}
        {tab === 2 && <UserFollowing userId={userId} />}
      </Grid>
    </Container>
  );
};

export default Profile;
