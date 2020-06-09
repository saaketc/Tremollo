import React from "react";
import queryString from "query-string";
import dataService from "../services/dataServices";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MediaCard from "./common/mediaCard";
import { useHistory } from "react-router-dom";
import { storageURL } from "../config/storage";
import colors from "../config/colors";

const styles = makeStyles((theme) => ({
  heading: {
    fontWeight: "500",
  },
  pic: {
    width: '15%',
    height: '15%',
    border: `2 px solid ${colors.primary}`,
    borderRadius: '50%',
    margin:20
  }
}));
const SearchResults = (props) => {
  const { q } = queryString.parse(props.location.search);
  const [content, setContent] = React.useState([]);
  const [users, setUsers] = React.useState([]);
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
      })
      .catch((error) => console.log(error));
  }, [q]);

  const handleUserClick = data => {
    return history.push('/profile', data);
  }
  return (
    <Container>
      {(content.length > 0 || users.length > 0) ? (
        <>
          <Typography variant="h4" className={classes.heading}>
            {`Results for ${q}`}
          </Typography>
          <br />
          <br />
          <Grid container spacing={6}>
            {content.map((c) => (
              <Grid item xs={12} lg={6} sm={6} md={6}>
                <MediaCard
                  data={c}
                  primaryProperty="title"
                  secProperty="caption"
                  url={storageURL + c.mediaLink}
                  thumbnailLink={storageURL + c.thumbnailLink}
                />
                <br />
              </Grid>
            ))}
          </Grid>
          <br/>
          <Grid container spacing={6}>
            {users.map((user) => (
              <Grid item xs={12} lg={6} sm={6} md={6}>
                <Button onClick={()=>handleUserClick(user)}>
                  <img className={classes.pic} src={storageURL + user.avatarLink} alt='user' />
                <Typography variant='h6'>
                {`  ${user.firstName} ${user.lastName}`} 
                </Typography>
               </Button>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="h4" className={classes.heading}>
          {`Sorry no results found for ${q} `}
          <br />
          <a href="/">Explore Music</a>
        </Typography>
      )}
    </Container>
  );
};

export default SearchResults;
