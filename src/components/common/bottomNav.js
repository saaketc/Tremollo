import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

import colors from "../../config/colors";
import Follow from "../socialInteraction/follow";
import Like from "../socialInteraction/like";
import Playlist from "../playlist";

const useStyles = makeStyles({
  root: {
    width: 800,
    paddingTop: "10px",
  },
});

export default function BottomNav({ data }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [added, setAdded] = React.useState(false);

  const handlePlaylistClick = () => {
    setAdded(!added);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label={data.likes}
        icon={
          <Like
            userId={data.followerId}
            isLikedByUser={data.isLikedByUser}
            contentId={data.contentId}
          />
        }
      />
      <BottomNavigationAction
        onClick={handlePlaylistClick}
        icon={
          <Playlist
            currentUserId={data.followerId}
            contentId={data.contentId}
          />
        }
      />
      <BottomNavigationAction
        label={`${data.followers} fans`}
        icon={
          <Follow
            followerId={data.followerId}
            followedId={data.followedId}
            isFollowedByUser={data.isFollowedByUser}
          />
        }
      />
    </BottomNavigation>
  );
}
