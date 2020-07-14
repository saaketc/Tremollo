import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import dataService from "../services/dataServices";
import { storageURL } from "../config/storage";
import CardComponent from "./common/cardComponent";
import { encode, stringSlice } from "../utils/utilfunctions";
import { Typography, Button } from "@material-ui/core";
import ReactLoading from "react-loading";
import colors from "../config/colors";
import { buttonStyleOpen } from "../config/buttonStyle";

const QueuePlaylist = (props) => {
  const { user, removeContentId } = props;
  const [queue, setQueue] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowCount, setRowCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [loadmore, setLoadmore] = useState(false);

  useEffect(() => {
    async function fetchFeedData() {
      try {
        const params = {
          pageNumber: 1,
          rowCount: 12,
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
  const loadMore = async () => {
    try {
      setLoadmore(true);
      setPageNumber(pageNumber + 1);
      const params = {
        pageNumber: pageNumber + 1,
        rowCount: rowCount,
        userId: user.userId,
      };
      const { data } = await dataService.getData("feed", params);
      // console.log('queue', data.body);
      if (data.body.length === 0) return setLoadmore(false);
      setQueue(() => {
        return [...queue, ...data.body];
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      // toast.error('Something went wrong');
    }
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
        <>
          {queue.map((f) => (
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
                  width={250}
                />
                <br />
              </Grid>
            </Grid>
          ))}
          <br />
          {!loadmore && (
            <div className="d-flex justify-content-center align-items-center">
              <Button onClick={loadMore} style={buttonStyleOpen}>
                Load more
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default QueuePlaylist;
