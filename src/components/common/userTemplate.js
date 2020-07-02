import React from "react";
import { Button, Avatar, Typography } from "@material-ui/core";
import { storageURL } from "../../config/storage";
import darkTheme from "../../config/themes/dark";
import { encode } from "../../utils/utilfunctions";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../config/colors";

const useStyles = makeStyles((theme) => ({
  btn: {
    textTransform: "none",
   
  },

}));
const UserTemplate = ({ user }) => {
  // const history = useHistory();
  const classes = useStyles();

  const handleClick = (user) => {
    return window.location = `/profile/${encode(user.userId)}`;
  };

  return (
    <div>
      <Button
        className={classes.btn}
        onClick={() => handleClick(user)}
        style={{ color: darkTheme.textColor }}
      >
        <Avatar alt="" src={storageURL + user.avatarLink} />
        <div>
        <Typography style={{ marginLeft: "22px" }} variant="h7">
          {`${user.username}`}
        </Typography>
        <br/>
        <Typography style={{ marginLeft: "22px", color: colors.secondary }} variant="p">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
          </div>
      </Button>
    </div>
  );
};

export default UserTemplate;
