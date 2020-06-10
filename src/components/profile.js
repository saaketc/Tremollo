import React from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import dataService from "../services/dataServices";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../config/colors";
import { storageURL } from "../config/storage";
import MediaCard from "./common/mediaCard";
import { month } from "../utils/utilfunctions";
import { getUserType } from "../utils/userFunctions";
import { buttonStyleClose } from "../config/buttonStyle";

const useStyles = makeStyles((theme) => ({
  btn:buttonStyleClose,
  title: {
    fontWeight: "900",
    color: colors.primary,
  },
  profilePic: {
    borderRadius: "50%",
    border: `10px solid ${colors.primary}`,
    width: "100%",
    height: "100%",
    verticalAlign: "middle",
    "&:hover": {
      opacity: 0.3,
    },
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
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    padding: "16px 32px",
  },
}));

const Profile = (props) => {
  const [userStats, setUserStats] = React.useState({});
  const [content, setContent] = React.useState([]);
  const classes = useStyles();
  const history = useHistory();
  const user = props.location.state;
  const { currentUser } = props;

  React.useEffect(() => {
    const userPromise = dataService.getData("user/stats", {
      userId: user.userId,
    });
    const contentPromise = dataService.getData("user/content", {
      userId: user.userId,
    });
    Promise.all([userPromise, contentPromise])
      .then(([userRes, contentRes]) => {
        console.log("user", userRes.data.body);
        console.log("content", contentRes.data.body);

        setUserStats(userRes.data.body);
        setContent(contentRes.data.body);
      })
      .catch((error) => console.log(error));
  }, [user]);

  const handleProfilePicClick = () => {
    return history.push('/uploadProfilePic', { from: 'Profile' });
  };
  // const handleEditClick = () => {
  //   return history.push('/edit', {followersCount: userStats.followers});
  // }
  const handleUploadContent = () => {
    return history.push('/myMusic/upload');
  }

  return (
    <Container>
      <br />
      <br />
      <Grid container spacing={6}>
        <Grid item xs={12} md={3} lg={3}>
          <Button
            onClick={() =>
              currentUser.userId === user.userId
                ? handleProfilePicClick()
                : null
            }
          >
            <img
              src={storageURL + user.avatarLink}
              alt="profile"
              className={classes.profilePic}
            />
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h2" style={{ fontWeight: "500" }}>
            {` ${user.firstName} ${user.lastName} `}
          </Typography>
          <Typography
            className={classes.title}
            variant="h6"
            style={{ fontWeight: "500" }}
          >
            {getUserType(user.type)}
          </Typography>
          <br />
          <Typography variant="h5" style={{ fontWeight: "400" }}>
            {user.about}
          </Typography>
          <br />
          <Typography variant="h5" style={{ fontWeight: "400" }}>
            {` ${userStats.uploads} Shots  |  ${userStats.followers} Fans  |  Fan of ${userStats.following} `}
          </Typography>
          <br />
          {currentUser.userId === user.userId && 
            // <Button onClick={handleEditClick} className={classes.btn} >Edit profile</Button>
            <Button className={classes.btn} onClick={handleUploadContent}>Upload content</Button>       
          }
        </Grid>
      </Grid>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <Typography
        variant="h3"
        style={{ fontWeight: "600", textAlign: "center" }}
        className={classes.title}
      >
        {content.length > 0
          ? "Music portfolio"
          : "Haven't uploaded anything yet :( "}
      </Typography>
      <br />
      <br />

      <Grid container spacing={6}>
        {content &&
          content.map((c) => (
            <Grid item xs={12} md={4} lg={4}>
              <MediaCard
                data={c}
                primaryProperty="title"
                secProperty="caption"
                message1={`${month(new Date(c.dateUpload).getMonth())} ${
                  new Date(c.dateUpload).getDay() + 1
                } ${new Date(c.dateUpload).getFullYear()}`}
                url={storageURL + c.mediaLink}
                thumbnailLink={storageURL + c.thumbnailLink}
                message2={`${c.likesCount} likes`}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Profile;
