import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

import dataService from "../services/dataServices";
import { storageURL } from "../config/storage";
import CardComponent from "./common/cardComponent";
import { encode } from "../utils/utilfunctions";
import ReactLoading from "react-loading";
import darkTheme from "../config/themes/dark";

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
          rowCount: 30,
          userId: user.userId,
        };
        const { data } = await dataService.getData("feed", params);
        console.log("feed", data.body);
        setFeed(data.body);
        setLoading(false);
      } catch (e) {
        console.log(e);
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
    <Container maxWidth="100%">
      {
        loading ?
          <div class="d-flex justify-content-center align-items-center" style={{ marginTop: '10rem'}}>
          <ReactLoading
        type="spin"
        color={darkTheme.primary}
        height={100}
            width={100}
          
            />
            </div>
          :
          <Grid container spacing={4}>
          {feed &&
            feed.map((f) => (
              <Grid item xs={12} lg={3} md={3}>
                <CardComponent
                  loading={loading}
                  data={f}
                  primaryData={f.title}
                  secondaryData={`by ${f.username}`}
                  onClick={handleAlbumClick}
                  image={storageURL + f.thumbnailLink}
                />
                <br />
              </Grid>
            ))}
        </Grid>
      }
    
    </Container>
  );
};

export default Feed;
