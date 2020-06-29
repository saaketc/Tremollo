import React from "react";
import { Button } from "@material-ui/core";
import { buttonStyleOpen, buttonStyleClose } from "../../config/buttonStyle";
import dataServices from "../../services/dataServices";
import { toast } from "react-toastify";

const Follow = (props) => {
  const { followerId, followedId, isFollowedByUser } = props;
  const [follows, setFollows] = React.useState(isFollowedByUser);

  React.useEffect(() => {
    setFollows(isFollowedByUser);
  }, [isFollowedByUser])
  
  const handleFollow = async () => {
    const oldFollow = follows;
      try {
        
      // setFollows(!follows);
      const { data } = await dataServices.putData("user/follow", {
        followerId,
        followedId,
        follow: !follows,
      });
          setFollows(data.body.followed);
          console.log(data);
        // toast('Fan!');
          
    } catch (e) {
      setFollows(oldFollow);
        toast.error("Something went wrong");
        console.log(e.message);
    }
  };
  return (
      <Button
        onClick={handleFollow}
        style={follows ? buttonStyleClose : buttonStyleOpen }
      >
        {follows ? 'You are a fan' : 'Be a fan'}
      </Button>
  );
};

export default Follow;
