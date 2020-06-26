import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Container, Avatar } from "@material-ui/core";

import dataServices from "../../services/dataServices";
import { toast } from "react-toastify";
import colors from "../../config/colors";
import { useHistory } from "react-router-dom";
import UserTemplate from "../common/userTemplate";


const styles = makeStyles((theme) => ({
  heading: {
    fontWeight: "500",
  },
  title: {
    color: colors.white
  },

  pic: {
    width: "15%",
    height: "15%",
      border: `1 px solid ${colors.primary}`,
    padding: '3px',
    borderRadius: "50%",
    margin: 20,
  },
  btn: {
    backgroundColor: colors.darkCard
  }
  
}));
const UserFollowers = ({ userId }) => {
  const [followers, setFollowers] = React.useState([]);
  const classes = styles();
  const history = useHistory();

  React.useEffect(() => {
    const getFollowers = async () => {
      try {
        const { data } = await dataServices.getData("user/followers", {
          userId,
        });
        console.log(data.body);
        setFollowers(data.body);
      } catch (e) {
        console.log(e.message);
        toast.error("Something went wrong!");
      }
    };
    getFollowers();
  }, [userId]);

 
  return (
    <Container maxWidth='100%'>
     
                    {followers.length === 0 &&
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
