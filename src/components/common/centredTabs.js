import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    
  },
});

export default function CenteredTabs({labels, afterTabSet, maxWidth}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    afterTabSet(newValue);
  };
  return (
    <Paper className={classes.root} style={{maxWidth: maxWidth ? maxWidth : ''}}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
      > {
          labels.map(label => (
            <Tab key={label} label={label} />
          ))
      }
       
      </Tabs>
    </Paper>
  );
}