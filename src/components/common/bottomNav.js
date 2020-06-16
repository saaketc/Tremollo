import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Button } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import { buttonStyleOpen } from '../../config/buttonStyle';
import colors from '../../config/colors';

const useStyles = makeStyles({
  root: {
    width: 800,
    backgroundColor: colors.darkCard
  },
});

export default function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [added, setAdded] = React.useState(false);

  const handlePlaylistClick = () => {
    setAdded(!added);
  }
  
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction  icon={<FavoriteIcon />} />
      <BottomNavigationAction onClick={handlePlaylistClick} icon={!added ? <PlaylistAddIcon /> : <PlaylistAddCheckIcon/>} />
      <BottomNavigationAction  icon={<Button style={buttonStyleOpen}>Be a fan </Button>} />
    </BottomNavigation>
  );
}