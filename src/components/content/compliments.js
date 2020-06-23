import React, { useState, useEffect } from "react";
import dataServices from "../../services/dataServices";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";

import { Typography, Grid, Container, Avatar, Button } from "@material-ui/core";
import { storageURL } from "../../config/storage";
import darkTheme from "../../config/themes/dark";
import CardTemplate from "../common/cardTemplate";
import { month, fullDate } from "../../utils/utilfunctions";
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
      username: currentUser.username,
    };
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
          <br />
          <AddCompliment
            complimentingUser={currentUser}
            contentId={contentId}
            postSubmit={handlePostComplimentSubmit}
          />
          <br />
          <br />
          {compliments.map((compliment, i) => (
            <Grid container spacing={6}>
              <Grid item xs={12} md={6} lg={6} key={i}>
                <Grid container spacing={6}>
                  <Grid item md={2} lg={2}>
                    <Button
                      onClick={() => handleComplimentingUserClick(compliment)}
                      style={{ color: darkTheme.textColor }}
                    >
                      <Avatar alt="" src={storageURL + compliment.avatarLink} />
                    </Button>
                  </Grid>
                  <Grid item md={10} lg={10}>
                    <div>
                      <div>
                        <Button
                          onClick={() =>
                            handleComplimentingUserClick(compliment)
                          }
                          style={{ color: darkTheme.textColor }}
                        >
                          <Typography variant="h8">
                            {compliment.username}
                          </Typography>
                        </Button>
                        <small style={{color: '#FF6090', marginLeft:'10px' }}>
                          {fullDate(compliment.dateCreated)}
                        </small>
                      </div>

                      <br />
                      <Typography  variant="h12">{compliment.text}</Typography>
                    </div>
                  </Grid>
                </Grid>
                {/* <Typography variant="p">
                  {fullDate(compliment.dateCreated)}
                </Typography> */}
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </Container>
  );
};

export default Compliments;

