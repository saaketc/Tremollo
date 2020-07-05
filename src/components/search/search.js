import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

import darkTheme from "../../config/themes/dark";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    maxWidth: 500,
    padding: 10,
    border: '1 px solid white',
    borderRadius: '50px',
    background: darkTheme.backgroundCard
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    [theme.breakpoints.up("xs")]: {
      display: "block",
      width: 200,
    },
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  inputText: {
    color: darkTheme.textColor,
    // textAlign: 'center',
    marginTop: '5px',
    marginLeft: '20px'
  }
}));

export default function SearchBar() {
  const classes = useStyles();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = ({ currentTarget }) => {
    setSearchTerm(currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let search = searchTerm.trim();
    if (search === '')
      return;
    return history.push(`/search?q=${search}`);
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Search for Artists, Music, or Friends..."
        inputProps={{ "aria-label": "Search for Artists, Music, or Friends...", className: classes.inputText}}
        value={searchTerm}
        onChange={handleChange}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon style={{color: darkTheme.textColor}}/>
      </IconButton>
    </Paper>
  );
}
