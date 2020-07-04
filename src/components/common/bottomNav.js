import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import Like from "../socialInteraction/like";
import Playlist from "../playlist";
import Share from "../socialInteraction/share";
import darkTheme from "../../config/themes/dark";

const useStyles = makeStyles({
  root: {
    width: 800,
    paddingTop: "10px",
    background: darkTheme.background
  },
});

export default function BottomNav({ data }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0); 
  const [likeCount, setLikeCount] = React.useState();

  React.useEffect(() => {
    setLikeCount(data.likes);
  }, [data]);

  const handlePostLike = count => {
    // alert(`likeCount: ${likeCount}, integer: ${integer}`);
    setLikeCount(count);
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
      <BottomNavigationAction
        label={likeCount}
        style={{color: darkTheme.textColor}}
        icon={
          <Like
            userId={data.followerId}
            isLikedByUser={data.isLikedByUser}
            contentId={data.contentId}
            postLike={handlePostLike}
            likeCount={data.likes}
          />
        }
      />
      <BottomNavigationAction
        
        icon={
          <Playlist
            currentUserId={data.followerId}
            contentId={data.contentId}
            icon={true}
          />
        }
      />
      <BottomNavigationAction
        
        icon={
          <Share/>
        }
      />
    </BottomNavigation>
  );
}
