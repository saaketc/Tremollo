import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import darkTheme from "../../config/themes/dark";
import { FilledInput } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
   color: 'white'
  },
  label: {
    color:'white'
  },

  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: darkTheme.textColor,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(6),
    color: darkTheme.textColor,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: darkTheme.textColor,
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const {
    label,
    type,
    name,
    multiline,
    fullWidth,
    rows,
    placeholder,
    value,
    onChange,
    required,
  } = props;
  return (
    <>
      {/* <CssBaseline/> */}
      <div className={[classes.paper, classes.form]}>
        <TextField
          type={type}
          name={name}
          multiline={multiline}
          rows={rows}
          variant="filled"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          fullWidth={fullWidth}
          id={name}
          label={label}
          color="secondary"
          inputProps={{
            className: classes.input
          }}
          InputLabelProps={{
            className: classes.label
          }}
          autoFocus
        />
      </div>
    </>
  );
}
