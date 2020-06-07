import React from 'react'
import queryString from 'query-string';
import dataService from '../services/dataServices';
import { Typography, Container, Grid } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import CardComponent from "./common/cardComponent";

const storageURL = "https://eddy-bucket-0-1.s3.ap-south-1.amazonaws.com/";

const styles = makeStyles((theme) => ({
  heading: {
    fontWeight: "500",
  },
}));
const SearchResults = (props) => {
    const { q } = queryString.parse(props.location.search);
    const [searchResults, setSearchResults] = React.useState([]);

    const classes = styles();
    React.useEffect(() => {
        const getSearchResults = async () => {
            const { data } = await dataService.getData('content/search', { keyword: q });
            console.log(data.body)
            setSearchResults(data.body);
        }
        getSearchResults();
    }, [searchResults]);
    return (
      <Container>
        {searchResults.length > 0 ? (
          <>
            <Typography variant="h4" className={classes.heading}>
              {`Results for ${q}`}
            </Typography>
            <br />
            <br />
            <Grid container spacing={6}>
              {searchResults.map((c) => (
                <Grid item xs={12} lg={6} sm={6} md={6}>
                  <CardComponent
                    data={c}
                    property="title"
                    secondaryData={c.caption}
                    player={true}
                    url={storageURL + c.mediaLink}
                    thumbnailLink={storageURL + c.thumbnailLink}
                  />
                  <br />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Typography variant="h4" className={classes.heading}>
                        {`Sorry no results found for ${q} `}<br />
                        <a href='/'>Explore Music</a> 
          </Typography>
        )}
      </Container>
    );
}

export default SearchResults
