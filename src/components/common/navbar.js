import React from "react";
import { withRouter } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import colors from "../../config/colors";
import Search from "../search/search";
import logo from "../../logo/logo.svg";
import UploadButton from "../upload/uploadButton";
import { buttonStyleOpen } from "../../config/buttonStyle";
import { Avatar } from "@material-ui/core";
import { storageURL } from "../../config/storage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    fontWeight: "700",
    color: colors.primary,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchRes: {
    color: colors.primary,
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  btn: {
    margin: '20px',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  hover: {
    "&:hover": {
      backgroundColor: colors.white,
    },
  },
  container: {
    marginRight: "30",
    padding: "30",
  },
  right: {
    marginRight: "30px",
  },
  pic: {
    border: `1px solid ${colors.primary}`,
    padding: '4px'
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const { user } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    return props.history.push(`/profile/${window.btoa(user.userId)}`);
  };
  const handlePlaylistClick = () => {
    return props.history.push(`/playlist/${window.btoa(user.userId)}`);
  };
  const handleUploadButton = () => {
    return props.history.push('/myMusic/upload');
  };
  const handleLogout = () => {
    return props.history.push("/logout");
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        <Hidden only={["sm", "xs"]}>
          <Typography
            style={{ width: "100%" }}
            className={classes.title}
            variant="h5"
            noWrap
          >
            <a
              href="/"
              style={{ textDecoration: "none", color: colors.primary }}
            >
              <img src={logo} alt="tremollo music" />
            </a>
          </Typography>
        </Hidden>
        <Hidden only={["lg", "md"]}>
          <Typography className={classes.title} variant="h8" noWrap>
            <a
              href="/"
              style={{ textDecoration: "none", color: colors.primary }}
            >
              <img src={logo} alt="tremollo music" />
            </a>
          </Typography>
        </Hidden>
        {/* Search component here */}
        {user && 
        <div style={{ marginRight: "300px", width: '100%' }}>
        <Search />
      </div>
        }
        
     
        {!user && (
          
            <Button
                style={buttonStyleOpen}
                onClick={() => props.history.push('/about')}
              >
                About
              </Button>
              
        )}
        {user && (
          <>
              <IconButton>
            <UploadButton onClick={handleUploadButton} />
             </IconButton>
             <IconButton>
            
            <Button
            onClick={handlePlaylistClick}
            style={buttonStyleOpen}
            className={classes.right}
          >
                My playlist
          </Button>
             </IconButton>
          <div style={{ margin: "20px",display: 'inline'}}>
           
              
         
              <Avatar
                  onClick={handleMenu}
                  src={storageURL + user.avatarLink}
                  className={classes.pic}
              />
         
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={()=> props.history.push('/feedback')}>Feedback</MenuItem>
              <MenuItem onClick={()=> props.history.push('/about')}>About us</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            </div>
            </>
        )}
      </Toolbar>
    </div>
  );
}
export default withRouter(Navbar);
