import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form(props) {
  const classes = useStyles();
    const { label, type, name, multiline, fullWidth, rows, placeholder, value, onChange, required } = props;
    return (
   <>
      <CssBaseline />
      <div className={[classes.paper, classes.form]}>
           
                  <TextField
                    type={type}
                    name={name}
                    multiline={multiline}
                    rows={rows}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    fullWidth={fullWidth}
                    id={name}
                    label={label}
                    autoFocus
                  />
            
         
            </div>
            </>
  );
}
