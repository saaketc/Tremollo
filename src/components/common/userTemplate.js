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
  avatar: {
    objectFit: "contain",
    border: `solid 1px ${colors.primary}`,
    
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
        <Avatar alt="" className={classes.avatar} src={storageURL + user.avatarLink} />
        <div style={{textAlign: 'left'}}>
        <Typography style={{ marginLeft: "22px", }} variant="subtitle1">
          {`${user.username}`}
        </Typography>
        <Typography style={{ marginLeft: "22px", color: colors.secondary }} variant="subtitle2">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
          </div>
      </Button>
    </div>
  );
};

export default UserTemplate;
