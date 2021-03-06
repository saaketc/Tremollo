import React from "react";
import { withRouter } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import colors from "../../config/colors";
import { encode } from "../../utils/utilfunctions";
import UserAvatar from "./userAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "10px",
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    fontWeight: "700",
    color: colors.primary,
  },


  // btn: {
  //   margin: "20px",
  //   paddingLeft: "20px",
  //   paddingRight: "20px",
  // },
  hover: {
    "&:hover": {
      backgroundColor: colors.white,
    },
  },
  // container: {
  //   marginRight: "30",
  //   padding: "30",
  // },
  // right: {
  //   marginRight: "30px",
  // },

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
        <Hidden only={["sm", "xs"]}>
          <Typography
            className={classes.title}
            variant="h5"
            noWrap
          ></Typography>
        </Hidden>
        
        {user && (
          <>
            <UserAvatar user={user} onClick={handleMenu} />

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
          </>
        )}
      </Toolbar>
    </div>
  );
}
export default withRouter(Navbar);
