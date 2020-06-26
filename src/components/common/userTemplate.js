import React from 'react'
import { Button, Avatar, Typography } from '@material-ui/core'
import { storageURL } from '../../config/storage'
import darkTheme from '../../config/themes/dark';
import { useHistory } from "react-router-dom";

const UserTemplate = ({user }) => {
  const history = useHistory();
    
    const handleClick = (user) => {
        return history.push(`/profile/${window.btoa(user.userId)}`);
    };
    
    return (
        <div>
           <Button
                  onClick={() => handleClick(user)}
                  style={{ color: darkTheme.textColor }}
                >
                  <Avatar alt="" src={storageURL + user.avatarLink} />
                  <Typography style={{ marginLeft: "30px" }} variant="h8">
                    {user.username}
                  </Typography>
                </Button>  
        </div>
    )
}

export default UserTemplate
