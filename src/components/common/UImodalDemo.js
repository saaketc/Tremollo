import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";

import { blue } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import { thumbnailCreator } from "../../utils/utilfunctions";
import Form from "./form";
import darkTheme from "../../config/themes/dark";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function UImodal(props) {
  const classes = useStyles();
  const {
    onClose,
    selectedValue,
    open,
    playlist,
    postSubmitLogic,
    fields,
    button,
    onPlaylistClick
  } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    // onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <List style={{backgroundColor: darkTheme.backgroundCard}}>
        <Form
          postSubmitLogic={postSubmitLogic}
          heading=""
          fields={fields}
          noIcon={true}
          button={button}
        />
        {playlist && (
          <>
            {playlist.map((p) => (
              <ListItem
                button
                onClick={() => handleListItemClick(p.name)}
                key={p.playlistId}
              >
                <ListItemAvatar>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {thumbnailCreator(p.name)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText style={{color: darkTheme.textColor}} primary={p.name} onClick={()=> onPlaylistClick(p)} />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Dialog>
  );
}

UImodal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function UImodalDemo({
  playlist,
  onPlaylistClick,
  postSubmitLogic,
  fields,
  button,
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <IconButton aria-label="add to playlist" onClick={handleClickOpen}>
        <PlaylistAddIcon />
      </IconButton>
      <UImodal
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        playlist={playlist}
        onPlaylistClick={onPlaylistClick}
        postSubmitLogic={postSubmitLogic}
        fields={fields}
        button={button}
      />
    </div>
  );
}
