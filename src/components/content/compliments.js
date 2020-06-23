import React, { useState, useEffect } from "react";
import dataServices from "../../services/dataServices";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";

import { Typography, Grid, Container } from "@material-ui/core";
import { storageURL } from "../../config/storage";
import darkTheme from "../../config/themes/dark";
import CardTemplate from "../common/cardTemplate";
import { month } from "../../utils/utilfunctions";
import AddCompliment from "./addCompliment";

const Compliments = ({ contentId, currentUser }) => {
  const [compliments, setCompliments] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const fetchCompliments = async () => {
      try {
        const { data } = await dataServices.getData("content/comments", {
          contentId,
        });
        console.log(data.body);
        setCompliments(data.body);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchCompliments();
  }, [contentId]);

  const handleComplimentingUserClick = ({ userId }) => {
    return history.push(`/profile/${window.btoa(userId)}`);
  };
  const handlePostComplimentSubmit = (compliment) => {
      let addedCompliment = {
          ...compliment,
          avatarLink: currentUser.avatarLink,
          username: currentUser.username
    }  
      const newCompliments = [addedCompliment, ...compliments];
    setCompliments(newCompliments);
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
          {compliments.length === 0 && (
            <Typography variant="h4">No compliments yet...</Typography>
          )}
          <AddCompliment
            complimentingUserId={currentUser.userId}
            contentId={contentId}
            postSubmit={handlePostComplimentSubmit}
          />
          <br />
          <br />
          <Grid container spacing={6}>
            {compliments.map((compliment) => (
              <Grid item xs={12} md={6} lg={6}>
                <CardTemplate
                  data={compliment}
                  avatar={storageURL + compliment.avatarLink}
                  title={compliment.username}
                  subheader={` ${
                    new Date(compliment.dateCreated).getDate() + 1
                  }, ${month(
                    new Date(compliment.dateCreated).getMonth()
                  )} ${new Date(compliment.dateCreated).getFullYear()}`}
                  text={compliment.text}
                  onClick={handleComplimentingUserClick}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Compliments;
