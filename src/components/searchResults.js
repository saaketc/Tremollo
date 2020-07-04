import React from "react";
import queryString from "query-string";
import dataService from "../services/dataServices";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { storageURL } from "../config/storage";
import colors from "../config/colors";
import CardComponent from "./common/cardComponent";
import UserTemplate from "./common/userTemplate";
import { encode } from "../utils/utilfunctions";
import { buttonStyleOpen } from "../config/buttonStyle";
import Search from "./search/search";

const styles = makeStyles((theme) => ({
  heading: {
    fontWeight: "500",
    color: colors.white,
  },
  pic: {
    width: "15%",
    height: "15%",
    border: `2 px solid ${colors.primary}`,
    borderRadius: "50%",
    margin: 20,
  },
}));
const SearchResults = (props) => {
  const { q } = queryString.parse(props.location.search);
  const [content, setContent] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const history = useHistory();
  const classes = styles();

  React.useEffect(() => {
    const userPromise = dataService.getData("user/search", {
      keyword: q,
    });
    const contentPromise = dataService.getData("content/search", {
      keyword: q,
    });

    Promise.all([userPromise, contentPromise])
      .then(([userRes, contentRes]) => {
        console.log("user", userRes.data.body);
        console.log("content", contentRes.data.body);

        setUsers(userRes.data.body);
        setContent(contentRes.data.body);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [q]);

  const handleAlbumClick = async (data) => {
    // alert('Clicked');
    return history.push(`/content/${encode(data.contentId)}`);
  };

  return (
    <Container maxWidth="lg">
      <div maxWidth="100px">
        <Search />
      </div>
      <br />
      <br />
      <Typography variant="h7" className={classes.heading}>
        Collections, billboards, charts & much more coming soon! Stay tuned.
      </Typography>
      <br />
      <br />
      {content.length > 0 || users.length > 0 ? (
        <>
          <Typography variant="h4" className={classes.heading}>
            {!loading ? `Best results for ${q}` : ""}
          </Typography>
          <br />
          <Grid container spacing={6}>
            {content.map((c) => (
              <Grid item xs={12} lg={3} md={3}>
                <CardComponent
                  data={c}
                  primaryData={c.title}
                  tag={`${c.likesCount} likes`}
                  onClick={handleAlbumClick}
                  image={storageURL + c.thumbnailLink}
                  hover={false}
                />
                <br />
              </Grid>
            ))}
          </Grid>
          <br />
          <br />
          <Grid container spacing={6}>
            {users.map((user) => (
              <Grid item xs={12} lg={3} md={3}>
                <UserTemplate user={user} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        q && (
          <Typography variant="h4" className={classes.heading}>
            {!loading
              ? `Sorry no results found for ${q} :( `
              : `Loading results for ${q}...`}
            <br />
          </Typography>
        )
      )}
      <br />
      <br />
      <Button style={buttonStyleOpen} onClick={() => history.push("/")}>
        Explore Music
      </Button>
      <br />
      <br />
    </Container>
  );
};

export default SearchResults;
