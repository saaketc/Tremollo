import React, { useState, useEffect } from "react";
import dataServices from "../../services/dataServices";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import { Typography, Grid, Container, Button, Avatar } from "@material-ui/core";

import { storageURL } from "../../config/storage";
import darkTheme from "../../config/themes/dark";
import UserTemplate from "../common/userTemplate";

const ContentLikes = ({ contentId }) => {
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const fetchlikedUsers = async () => {
      try {
        const { data } = await dataServices.getData("content/likes", {
          contentId,
        });
        console.log(data.body);
        setLikedUsers(data.body);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchlikedUsers();
  }, [contentId]);

  const handleLikedUserClick = ({ userId }) => {
    return history.push(`/profile/${window.btoa(userId)}`);
  };

  return (
    <Container>
      {loading ? (
        <ReactLoading
          type="spin"
          color={darkTheme.primary}
          height={100}
          width={100}
        />
      ) : (
        <>
          {likedUsers.length === 0 && (
            <Typography variant="h4">No likes yet...</Typography>
          )}

          <br />
          <br />
          <Grid container spacing={6}>
            {likedUsers.map((user) => (
              <Grid item xs={12} md={6} lg={6}>
               <UserTemplate
              user={user}/>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ContentLikes;
