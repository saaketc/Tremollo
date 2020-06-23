import React from "react";
import UImodalDemo from "./common/UImodalDemo";
import dataService from "../services/dataServices";
import { toast } from 'react-toastify';

const fields = [{ name: "name", label: "Playlist name", type: "text" }];
const button = { type: "submit", label: "Create new", color: "#bf2604" };

const Playlist = (props) => {
  const { currentUserId, contentId } = props;
  const [playlist, setPlaylist] = React.useState();

  React.useEffect(() => {
    //making api call to fetch current user playlist
    const fetchPlaylist = async () => {
      const { data } = await dataService.getData("user/playlist", {
        userId: currentUserId,
      });
     
      setPlaylist(data.body.reverse());
    };
    fetchPlaylist();
  }, [currentUserId]);

  const postSubmitLogic = async (submittedData) => {
    
    let list = {
      playlistName: submittedData["name"],
      userId: currentUserId,
    };
    let oldList = [...playlist];
    // console.log(list);
    try {
      setPlaylist([submittedData, ...playlist]);
      const { data } = await dataService.postData("playlist/create", list);
     
      // playlist.unshift(data.body);
      //   setPlaylist([data.body, ...playlist]);
    } catch (e) {
      toast.error("Ooops something went wrong!");
      setPlaylist(oldList);
    }
  };

  const handlePlaylistAddClick = async (playlistItem) => {
    try {
      const { data } = await dataService.postData("playlist/add", {
        playlistId: playlistItem.playlistId,
        contentId,
      });
      toast.success(`Added to ${playlistItem.name}`);

      console.log(data.body);
    } catch (e) {
      toast.error("Ooops something went wrong!");

    }
  };
  return (
    
    <UImodalDemo
      currentUserId={currentUserId}
      playlist={playlist}
      onPlaylistClick={handlePlaylistAddClick}
      postSubmitLogic={postSubmitLogic}
      fields={fields}
      button={button}
    />
  );
};
export default Playlist;
