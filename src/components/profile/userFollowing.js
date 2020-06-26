import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container } from "@material-ui/core";

import dataServices from "../../services/dataServices";
import { toast } from "react-toastify";
import colors from "../../config/colors";
import UserTemplate from "../common/userTemplate";

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
             <UserTemplate
              user={user}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserFollowing;
