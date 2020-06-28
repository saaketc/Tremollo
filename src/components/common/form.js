import React from "react";
// import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid";
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import HeadsetIcon from "@material-ui/icons/Headset";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import colors from "../../config/colors";
import { buttonStyleOpen } from "../../config/buttonStyle";
import darkTheme from "../../config/themes/dark";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "white",
    background: darkTheme.backgroundCard

  },
  label: {
    color: "white",
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: {
    fontWeight: "600",
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const {
    fields,
    heading,
    button,
    login,
    dropDown,
    postSubmitLogic,
    redirectUrl,
    noIcon,
  } = props;

  const [formFields, setFormFields] = React.useState({});
  const [disableSubmit, setDisableSubmit] = React.useState(true);


  const handleChange = ({ currentTarget }) => {
    if (currentTarget.value.trim() === '') {
      setDisableSubmit(true);
    }
    else setDisableSubmit(false);

    let form = { ...formFields };
    form[currentTarget.name] = currentTarget.value;
    setFormFields(form);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formFields };

    // data processing and working logic for individual forms
    postSubmitLogic(data);
  };
  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        {!noIcon && (
          <IconButton>
            <HeadsetIcon style={{ fontSize: "50px", color: colors.primary }} />
          </IconButton>
        )}

        <Typography component="h1" variant="h5" className={classes.heading}>
          {heading}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fields.map((f) => (
              <>
                <Grid item xs={12} sm={12} lg={12}>
                  <TextField
                    autoComplete={f.name}
                    type={f.type}
                    name={f.name}
                    variant="filled"
                    value={formFields[f.name]}
                    onChange={handleChange}
                    required
                    fullWidth
                    id={f.name}
                    label={f.label}
                    inputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      className: classes.label,
                    }}
                    color="secondary"
                    autoFocus
                  />
                </Grid>
              </>
            ))}
            {dropDown && (
              <Grid item xs={12} sm={12} lg={12}>
                <InputLabel htmlFor={dropDown.name}>
                  {dropDown.label}
                </InputLabel>
                <Select
                  name={dropDown.name}
                  value={formFields[dropDown.name]}
                  onChange={handleChange}
                  required
                  fullWidth
                  id={dropDown.name}
                  variant="outlined"
                  autoFocus
                  placeholder={dropDown.label}
                >
                  {dropDown.options.map((o) => (
                    <option value={o}>{o}</option>
                  ))}
                </Select>
              </Grid>
            )}
          </Grid>
          <br/>
          <Button
            type={button.type}
            fullWidth
            style={buttonStyleOpen}
            disabled={disableSubmit}
          >
            {button.label}
          </Button>
          <br/>
          <br/>
          {login && (
            <>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to={{
                    pathname: "/auth/signup",
                    state: redirectUrl
                  }} variant="body2" style={{color: colors.primary}}>
                    New to tremollo? Create account
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
           
        </form>
      </div>
    </Container>
  );
}
