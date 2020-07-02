import React, { useState, useEffect } from "react";
import dataServices from "../../services/dataServices";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Typography, Grid, Container, Avatar, Button } from "@material-ui/core";
import { storageURL } from "../../config/storage";
import darkTheme from "../../config/themes/dark";
import { fullDate, encode } from "../../utils/utilfunctions";
import AddCompliment from "./addCompliment";
import colors from "../../config/colors";

const useStyles = makeStyles({
  avatar: {
    objectFit: "contain",
    border: `solid 1px ${colors.primary}`,
  },
  btn: {
    textTransform: "none",
  },
});

const Compliments = ({ contentId, currentUser }) => {
  const [compliments, setCompliments] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const classes = useStyles();

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
    return history.push(`/profile/${encode(userId)}`);
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

      {(!loading && compliments.length === 0) && (
        <Typography variant="h4">No compliments yet...</Typography>
      )}
      <br />
      
      <AddCompliment
        complimentingUser={currentUser}
        contentId={contentId}
        postSubmit={handlePostComplimentSubmit}
      />
      <br/>
      <br/>
      <span>{compliments.length > 0 ? `${compliments.length} compliments` : ''}</span>

      <br />
      <br />
      {loading ? (
        <ReactLoading
          type="spin"
          color={darkTheme.primary}
          height={100}
          width={100}
        />
      ) : (
        <>
          {compliments.map((compliment, i) => (
            <Grid container spacing={6}>
              <Grid item xs={12} md={6} lg={6} key={i}>
                <Grid container spacing={6}>
                  <Grid item md={2} lg={2}>
                    <Button
                      onClick={() => handleComplimentingUserClick(compliment)}
                      style={{ color: darkTheme.textColor }}
                    >
                      <Avatar
                        className={classes.avatar}
                        alt=""
                        src={storageURL + compliment.avatarLink}
                      />
                    </Button>
                  </Grid>
                  <Grid item md={10} lg={10}>
                    <div>
                      <div>
                        <Button
                          className={classes.btn}
                          onClick={() =>
                            handleComplimentingUserClick(compliment)
                          }
                          style={{ color: darkTheme.textColor }}
                        >
                          <Typography variant="h8">
                            {compliment.username}
                          </Typography>
                        </Button>
                        <small style={{ color: "#6C757D", marginLeft: "10px" }}>
                          {fullDate(compliment.dateCreated)}
                        </small>
                      </div>

                      <br />
                      <Typography variant="h12">{compliment.text}</Typography>
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
