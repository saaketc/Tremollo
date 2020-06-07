// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { Container, Grid, Typography } from "@material-ui/core";
// import { Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import queryString from "query-string";

// import MediaCard from "../ui/mediaCard";
// import { getData } from "../../services/dataServices";
// import colors from "../../config/colors";
// import { createSlug } from '../../utils/generalFunctions';

// const useStyles = makeStyles((theme) => ({
//   btn: {
//     color: colors.white,
//     border: `1px solid ${colors.primary}`,
//     backgroundColor: colors.primary,
//     "&:hover": {
//       backgroundColor: colors.primary,
//     },
//   },
//   title: {
//     fontWeight: "600",
//     color: colors.primary,
//   },
// }));

// const SearchResults = (props) => {
//   const history = useHistory();
//     const [campaigns, setCampaigns] = useState([]);
//     const { q } = queryString.parse(props.location.search);
//   const classes = useStyles();

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       const { data } = await getData(`search/${q}`);
//       setCampaigns(data);
//     };
//     fetchCampaigns();
//   }, [q]);

//   const handleCampaignClick = (campaign) => {
//     return history.push(`/campaign/${createSlug(campaign.title)}?space=${campaign._id}`);
//   }
//   return (
//     <Container style={{ textAlign: "center" }}>
//       <br />
//       <Typography variant="h4" className={classes.title}>
//       {campaigns.length === 0 ? `No results for ${q}` :  `Search results for ${q}`}
//       </Typography>
//       <br />
//       <br />
//       <Grid container spacing={4}>
//         {campaigns.map((campaign) => (
//           <Grid item xs={12} md={4} lg={4}>
//             <MediaCard
//               data={campaign}
//               primaryProperty="title"
//               secProperty="description"
//               message1={campaign.status}
//               message2={`Fund raised: INR ${campaign.fundRaised}`}
//               message3={`Goal: INR ${campaign.goalAmount}`}
//               url={campaign.mediaUrl}
//               onClick={handleCampaignClick}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default SearchResults;
