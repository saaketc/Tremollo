import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import dataService from "../services/dataServices";
import { storageURL } from "../config/storage";
import CardComponent from "./common/cardComponent";
import { encode, stringSlice } from "../utils/utilfunctions";
import ReactLoading from "react-loading";
import darkTheme from "../config/themes/dark";
import { Typography, Button } from "@material-ui/core";
// import colors from "../config/colors";
import { buttonStyleOpen } from "../config/buttonStyle";
import colors from "../config/colors";

const Feed = (props) => {
  const history = useHistory();
  const { user } = props;
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(24);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [newMusic, setNewMusic] = useState(true);

  useEffect(() => {
    async function fetchFeedData() {
      try {
        const params = {
          pageNumber: 1,
          rowCount: 24,
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

  const fetchMore = async () => {
    try {
      setLoadMore(true);
      setPage(page + 1);
      const params = {
        pageNumber: page + 1,
        rowCount: count,
        userId: user.userId,
      };
      const { data } = await dataService.getData("feed", params);
      console.log("feed", data.body);

      if (data.body.length === 0) {
        return setNewMusic(false);
      }

      setFeed(() => {
        return [...feed, ...data.body];
      });
      setLoadMore(false);
    } catch (e) {
      // console.log(e.message);
      // toast.error('Something went wrong');
    }
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
          <Grid container spacing={10}>
            {feed &&
              feed.map((f) => (
                <Grid item xs={12} lg={2} md={2} key={f.userId}>
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
                </Grid>
              ))}
          </Grid>
          <br />
          {loadMore && newMusic && (
            <h6
              className="d-flex justify-content-center align-items-center"
              style={{ color: colors.primary }}
            >
              Loading more music...
            </h6>
            )}
             {!newMusic && (
            <h6
              className="d-flex justify-content-center align-items-center"
              style={{ color: colors.primary }}
            >
              You have seen it all!
            </h6>
          )}
          {!loadMore && newMusic && (
            <div className="d-flex justify-content-center align-items-center">
              <Button onClick={fetchMore} style={buttonStyleOpen}>
                Load more
              </Button>
            </div>
          )}

          <br />
          <br />
          <br />
        </>
      )}
    </Container>
  );
};

export default Feed;
