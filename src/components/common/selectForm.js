import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import darkTheme from '../../config/themes/dark';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  input: {
    color: 'white',
    background: darkTheme.backgroundCard

   },
   label: {
     color:'white'
   },
}));

export default function SelectForm({label, value, name, options, onChange}) {
  const classes = useStyles();

  return (
    
      <div  className={classes.root}>
        <TextField
        select
        variant="filled"
          label={label}
          value={value}
              onChange={onChange}
        name={name}
        color="secondary"
        inputProps={{
          className: classes.input
        }}
        InputLabelProps={{
          className: classes.label
        }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
       
          </div>
         
    
  );
}