import React from 'react'
import { Button, Avatar } from '@material-ui/core'
import { buttonStyleOpen } from '../../config/buttonStyle'
import { storageURL } from '../../config/storage'
import colors from '../../config/colors'

const UserAvatar = ({user, onClick}) => {
    return (
        <div>
            <Button style={buttonStyleOpen}  onClick={onClick}>
            <Avatar
              
              style={{marginRight: '4px',  border: `1px solid ${colors.primary}`,}}
              src={storageURL + user.avatarLink}
              
              />
              {user.username}
              </Button> 
        </div>
    )
}

export default UserAvatar
