import React from "react";
import { Grid, Typography, Container } from "@material-ui/core";

import dataServices from "../../services/dataServices";
import { toast } from "react-toastify";
import UserTemplate from "../common/userTemplate";

const UserFollowers = ({ userId, currentUserId, isFollows }) => {
  const [followers, setFollowers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getFollowers = async () => {
      try {
        let follows = false;

        const { data } = await dataServices.getData("user/followers", {
          userId,
        });
        // console.log(data.body);
        setFollowers(data.body);
        setLoading(false)

        // to test current user follows this user
        for (let follower of data.body) {
          if (currentUserId === follower.userId) {
            follows = true;
            break;
          }
          else continue;
        }
        isFollows(follows);
        
      } catch (e) {
        console.log(e.message);
        toast.error("Something went wrong!");
      }
    };
    getFollowers();
  }, [userId, currentUserId, isFollows]);

 
  return (
    <Container maxWidth='xl'>
     
                    {(!loading && followers.length === 0) &&
              <Typography variant='h5'>
              Currently no fans!.
              </Typography>
          }
      <Grid container spacing={4}>
        {followers.map((user) => (
          <Grid item xs={12} lg={3}  md={3}>
            <UserTemplate
              user={user}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserFollowers;
