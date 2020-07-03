import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Navbar from "./navbar";
import logo from "../../logo/logo.svg";
import colors from "../../config/colors";
// import Search from "../search/search";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, Button } from "@material-ui/core";
import darkTheme from "../../config/themes/dark";
import UploadButton from "../upload/uploadButton";
import { buttonStyleOpen } from "../../config/buttonStyle";
import { encode } from "../../utils/utilfunctions";

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
      <div style={{ alignItems: "right" }}>
        <Navbar user={user} />
      </div>
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
          <ListItem button>
            <ListItemIcon>
              {user && (
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon style={{ color: darkTheme.textColor }} />
                </IconButton>
              )}
            </ListItemIcon>
            <ListItemText secondary="Search" />
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
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
