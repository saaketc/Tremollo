import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { darkTheme } from '../../config/Themes';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: darkTheme.backgroundCard
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
    <Paper className={classes.root} style={{maxWidth: maxWidth ? maxWidth : '', background:darkTheme.background, color:'white' }}>
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