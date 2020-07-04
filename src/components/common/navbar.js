import React from "react";
import { withRouter } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import colors from "../../config/colors";
// import Search from "../search/search";
import { buttonStyleOpen } from "../../config/buttonStyle";
import { Avatar } from "@material-ui/core";
import { storageURL } from "../../config/storage";
import { encode } from "../../utils/utilfunctions";

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
    margin: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
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
  },
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
    return (window.location = `/profile/${encode(user.userId)}`);
  };

  const handleLogout = () => {
    return props.history.push("/logout");
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        {!user && (
          <Button
            style={buttonStyleOpen}
            onClick={() => props.history.push("/about")}
          >
            About
          </Button>
        )}

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

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </div>
  );
}
export default withRouter(Navbar);
