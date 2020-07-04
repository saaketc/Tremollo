import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import dataService from "../services/dataServices";
import { storageURL } from "../config/storage";
import CardComponent from "./common/cardComponent";
import { filter, encode, stringSlice } from "../utils/utilfunctions";
import { Typography } from "@material-ui/core";
import ReactLoading from "react-loading";
import colors from "../config/colors";

const QueuePlaylist = (props) => {
  const { user, removeContentId } = props;
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function fetchFeedData() {
      try {
        const params = {
          pageNumber: 1,
          rowCount: 40,
          userId: user.userId,
        };
        const { data } = await dataService.getData("feed", params);
        // console.log('queue', data.body);
        setQueue(data.body);
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
    return (window.location.href = `/content/${encode(data.contentId)}`);
  };
  return (
    <>
      <Typography variant="h4" style={{ fontWeight: 600, marginLeft: "10px" }}>
        Explore more
      </Typography>
      <br />
      {loading ? (
        <ReactLoading
          type="spin"
          color={colors.primary}
          height={100}
          width={100}
        />
      ) : (
        filter(queue, "contentId", removeContentId).map((f) => (
          <Grid container spacing={6}>
            <Grid item xs={12} lg={3} md={3} key={f.title}>
              <CardComponent
                data={f}
                primaryData={stringSlice(f.title)}
                secondaryData={`by ${f.username}`}
                tooltip={f.title}
                tag={`${f.likes} likes`}
                onClick={handleAlbumClick}
                image={storageURL + f.thumbnailLink}
                hover={false}
              />
              <br />
            </Grid>
          </Grid>
        ))
      )}
    </>
  );
};

export default QueuePlaylist;
