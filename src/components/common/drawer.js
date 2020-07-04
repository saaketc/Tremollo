import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import FeedbackIcon from "@material-ui/icons/Feedback";
import HomeIcon from "@material-ui/icons/Home";
import Navbar from "./navbar";
import logo from "../../logo/logo.svg";
import colors from "../../config/colors";
// import Search from "../search/search";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import darkTheme from "../../config/themes/dark";
import UploadButton from "../upload/uploadButton";
import { buttonStyleOpen } from "../../config/buttonStyle";
import { encode } from "../../utils/utilfunctions";
import Playlist from "../playlist";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "black",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  text: {
    color: darkTheme.textColor,
  },
}));

export default function SideDrawer(props) {
  const classes = useStyles();
  const { user } = props;
  const history = useHistory();

  const handleUploadButton = () => {
    return history.push("/myMusic/upload");
  };
  const handlePlaylistClick = () => {
    return history.push(`/playlist/${encode(user.userId)}`);
  };

  return (
    <div className={classes.root}>
      <Navbar user={user} />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem>
            <ListItemText style={{ marginLeft: "10px" }}>
              <Typography style={{ marginTop: 0 }} variant="subtitle2" noWrap>
                <a
                  href="/"
                  style={{ textDecoration: "none", color: colors.primary }}
                >
                  <img src={logo} alt="tremollo music" />
                </a>
              </Typography>
            </ListItemText>
          </ListItem>
        </List>

        <List>
          <ListItem button onClick={() => history.push("/")}>
            <ListItemIcon className={classes.text}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText className={classes.text}>Home</ListItemText>
          </ListItem>

          <ListItem button onClick={() => history.push("/search")}>
            <ListItemIcon className={classes.text}>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText className={classes.text}>Search</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.text}>
              <PlaylistAddIcon />
            </ListItemIcon>
            <ListItemText className={classes.text}>
              <Playlist currentUserId={user.userId} icon={false} />
            </ListItemText>
          </ListItem>
        </List>

        <List>
          {user && (
            <>
              <ListItem>
                <ListItemText>
                  <Button onClick={handlePlaylistClick} style={buttonStyleOpen}>
                    My playlist
                  </Button>
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText>
                  <UploadButton onClick={handleUploadButton} />
                </ListItemText>
              </ListItem>
            </>
          )}
        </List>

        <List>
          <br />
          <br />
          <ListItem button onClick={() => history.push("/about")}>
            <ListItemIcon className={classes.text}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText className={classes.text}>About us</ListItemText>
          </ListItem>

          <ListItem button onClick={() => history.push("/feedback")}>
            <ListItemIcon className={classes.text}>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText className={classes.text}>Feedback</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
