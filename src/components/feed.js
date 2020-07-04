import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import dataService from "../services/dataServices";
import { storageURL } from "../config/storage";
import CardComponent from "./common/cardComponent";
import { encode, stringSlice } from "../utils/utilfunctions";
import ReactLoading from "react-loading";
import darkTheme from "../config/themes/dark";
import { Typography } from "@material-ui/core";
// import colors from "../config/colors";

const Feed = (props) => {
  const history = useHistory();
  const { user } = props;
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedData() {
      try {
        const params = {
          pageNumber: 1,
          rowCount: 40,
          userId: user.userId,
        };
        const { data } = await dataService.getData("feed", params);
        console.log("feed", data.body);
        setFeed(data.body);
        setLoading(false);
      } catch (e) {
        // console.log(e.message);
        // toast.error('Something went wrong');
      }
    }
    fetchFeedData();
  }, [user]);

  const handleAlbumClick = async (data) => {
    // alert('Clicked');
    return history.push(`/content/${encode(data.contentId)}`);
  };

  return (
    <Container>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ marginTop: "10rem" }}
        >
          <ReactLoading
            type="spokes"
            color={darkTheme.primary}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <>
          <Typography variant="h3" style={{ fontWeight: 600 }}>
            Curated for you with{" "}
            <FavoriteIcon
              style={{ color: "red", fontSize: "50px", marginBottom: "10px" }}
            />
          </Typography>
          <br />
          <br />
          <Grid container spacing={1}>
            {feed &&
              feed.map((f) => (
                <Grid item xs={12} lg={3} md={3} key={f.userId}>
                  <Tooltip title={f.title}>
                    <CardComponent
                      data={f}
                      primaryData={stringSlice(f.title)}
                      secondaryData={f.username}
                      tooltip={f.title}
                      // tag={`${f.likes} likes`}
                      onClick={handleAlbumClick}
                      image={storageURL + f.thumbnailLink}
                      hover={true}
                    />
                  </Tooltip>
                  <br />
                </Grid>
              ))}
          </Grid>
          <br />
          <br />
          <br />
        </>
      )}
    </Container>
  );
};

export default Feed;
