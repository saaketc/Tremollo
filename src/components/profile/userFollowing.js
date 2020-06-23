import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Container } from "@material-ui/core";

import dataServices from "../../services/dataServices";
import { toast } from "react-toastify";
import colors from "../../config/colors";
import { useHistory } from "react-router-dom";
import { storageURL } from "../../config/storage";

const styles = makeStyles((theme) => ({

    heading: {
    fontWeight: "500",
    },
    title: {
        color: colors.white
    },
  pic: {
    width: 50,
    height: 50,
      border: `1 px solid ${colors.primary}`,
    padding: '3px',
    borderRadius: "50%",
    margin: 20,
    },
    btn: {
      backgroundColor: colors.darkCard
  }
}));
const UserFollowing = ({ userId }) => {
  const [following, setFollowing] = React.useState([]);
  const classes = styles();
  const history = useHistory();

  React.useEffect(() => {
    const getFollowers = async () => {
      try {
        const { data } = await dataServices.getData("user/following", {
          userId,
        });
        console.log(data.body);
        setFollowing(data.body);
      } catch (e) {
        console.log(e.message);
        toast.error("Something went wrong!");
      }
    };
    getFollowers();
  }, [userId]);

  const handleClick = (user) => {
    return history.push(`/profile/${window.btoa(user.userId)}`);
  };
  return (
    <Container maxWidth='100%'>
      
          {following.length === 0 &&
              <Typography variant='h5'>
              Ooops! Fan of no one.
              </Typography>
          }
      <Grid container spacing={4}>
        {following.map((user) => (
          <Grid item xs={12} lg={3}  md={3}>
                <Button className={classes.btn} onClick={() => handleClick(user)}>
              <img
                className={classes.pic}
                src={storageURL + user.avatarLink}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <Typography variant="h6" className={classes.title}>
                {user.username}
              </Typography>
              
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserFollowing;
