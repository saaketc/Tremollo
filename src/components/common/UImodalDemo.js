import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';
// import Typography from '@material-ui/core/Typography';
import { blue } from "@material-ui/core/colors";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import IconButton from "@material-ui/core/IconButton";
import { thumbnailCreator } from "../../utils/utilfunctions";
import Form from "./form";

import dataService from "../../services/dataServices";
import { toast } from "react-toastify";

// const emails = ['username@gmail.com', 'user02@gmail.com'];
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
      {/* <DialogTitle id="simple-dialog-title">Add to existing or create new playlist</DialogTitle> */}
      <List>
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
                    {thumbnailCreator("Tremollo")}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={p.name} onClick={()=> onPlaylistClick(p)} />
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
        <LibraryAddIcon />
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
