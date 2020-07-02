import React from "react";
import { Grid, Typography, Container } from "@material-ui/core";

import dataServices from "../../services/dataServices";
import { toast } from "react-toastify";
import UserTemplate from "../common/userTemplate";

const UserFollowing = ({ userId }) => {
  const [following, setFollowing] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // const classes = styles();

  React.useEffect(() => {
    const getFollowers = async () => {
      try {
        const { data } = await dataServices.getData("user/following", {
          userId,
        });
        // console.log(data.body);
        setFollowing(data.body);
        setLoading(false)
      } catch (e) {
        // console.log(e.message);
        toast.error("Something went wrong!");
      }
    };
    getFollowers();
  }, [userId]);

  return (
    <Container maxWidth='xl'>
      
          {(!loading && following.length === 0) &&
              <Typography variant='h5'>
              Ooops! Fan of no one.
              </Typography>
          }
      <Grid container spacing={4}>
        {following.map((user) => (
          <Grid item xs={12} lg={3}  md={3} key={user.userId}>
             <UserTemplate
              user={user}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserFollowing;
