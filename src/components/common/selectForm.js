import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function SelectForm({label, value, name, options, onChange}) {
  const classes = useStyles();

  return (
    
      <div  className={classes.root}>
        <TextField
          select
          label={label}
          value={value}
              onChange={onChange}
              name={name}
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