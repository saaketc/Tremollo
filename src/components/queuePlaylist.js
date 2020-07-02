import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import dataService from "../services/dataServices";
import { storageURL } from "../config/storage";
import CardComponent from "./common/cardComponent";
import { filter, encode } from "../utils/utilfunctions";

const QueuePlaylist = (props) => {
  const { user, removeContentId } = props;
  const [queue, setQueue] = useState([]);

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
      {filter(queue, "contentId", removeContentId).map((f) => (
        <Grid container spacing={6}>
          <Grid item xs={12} lg={3} md={3} key={f.title}>
            <CardComponent
              data={f}
              primaryData={f.title}
              secondaryData={`by ${f.username}`}
              tag={`${f.likes} likes`}
              onClick={handleAlbumClick}
              image={storageURL + f.thumbnailLink}
              width={200}
            />
            <br />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default QueuePlaylist;
