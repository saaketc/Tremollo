import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

import colors from "../../config/colors";


const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "12px",
    textDecoration: "none",
    color: colors.black,
    display: "block",
  },
}));
const Search = () => {
  const classes = useStyles();
  const history = useHistory();

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = async ({ currentTarget }) => {
    
    setSearchTerm(currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm)
      return
    return history.push(`/search?q=${searchTerm}`);
  };


  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon style={{ color: colors.black }} />
      </div>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <InputBase
          placeholder="Search music..."
          style={{ color: colors.black }}
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </form>
    </div>
  );
};

export default Search;
