import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import colors from "../config/colors";
import musicIllus from "../illustrations/compose.svg";
import musicLoveIllus from "../illustrations/music_love.svg";
import playlistIllus from "../illustrations/playlist.svg";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Footer from "./footer";
import { buttonStyleOpen, buttonStyleClose } from "../config/buttonStyle";
import SignupButton from "./auth/signupButton";
import LoginButton from "./auth/loginButton";

const useStyles = makeStyles((theme) => ({
  btn: {
    color: colors.white,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primary,
    "&:hover": {
      backgroundColor: colors.primary,
    },
  },
  title: {
    fontWeight: "900",
    color: colors.primary,
  },
  description: {
    fontWeight: "700",
    color: colors.white,
  },
  topSpace: {
    marginTop: '30px'
  },
  left: {
    marginLeft:0
  },
  right: {
    marginRight:0
  }
}));

const descriptions = [
  {text: 'Explore interesting music', illustration: musicIllus},
  {text: 'Share your musical creativity', illustration: musicLoveIllus},
  {text: 'Create your musical portfolio', illustration: playlistIllus}
]
const Welcome = () => {
 
  const classes = useStyles();

  return (
    <Container >
      <br />
      <br />
      
      <Hidden only={["xs", "s"]}>
        <Typography variant="h1" className={classes.title}>
        Music sharing platform <br/> for music lovers
        </Typography>
      </Hidden>
      <Hidden only={["lg", "s", "md"]}>
        <Typography variant="h3" className={classes.title}>
        Music sharing platform <br/> for music lovers
        </Typography>
      </Hidden>
      <br />
      <Typography variant="h6" className={classes.description}>
        Explore fresh and experimented music, create playlists,
        <br />
        share your musical creativity with others, and lots more!
      </Typography>
      <br />
      <Grid style={{textAlign: 'center'}} container spacing={4}>
        <Grid item>
        <SignupButton
        label='Get Started'
        buttonStyle={buttonStyleOpen}/>
        </Grid>
        <Grid item>
      <LoginButton
        label='Login'
            buttonStyle={buttonStyleOpen} />
          </Grid>
       </Grid>
      <br/>
      <br/>
    
      <Typography className={classes.description} variant='h3'>
        With tremollo you can...
      </Typography>
      <br/>
      <Grid container spacing={6} className={classes.topSpace}>
        {
          descriptions.map(d => (
            <Grid item xs={12} md={4} lg={4}>
             <Typography className={classes.description}variant='h5'>
          {d.text}
            </Typography>
        <br/>
        <img className={classes.left} src={d.illustration} alt='explore'/> 
            </Grid>
          ))
     }
      </Grid>
  <Footer/>

    </Container>
  );
};

export default Welcome;
