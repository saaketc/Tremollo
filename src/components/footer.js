import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles(theme => ({
    footer: {
        // backgroundColor: theme.palette.background.paper,
        // marginTop: theme.spacing(8),
        padding: theme.spacing(6, 0),
        color: 'white'
    }
}));

function Copyright() {
    return (
        <Typography variant="body2" style={{color: 'white'}} align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
             tremollo music
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function Footer(props) {
    const classes = useStyles();
    const {  title } = props;

    return (
        <footer className={classes.footer}>
            
            <Container maxWidth="lg">
                
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                         
                          
                <Typography variant="subtitle1" align="center"  component="p">
                    Made with <FavoriteIcon style={{color:'red', fontSize:'20px'}}/> & pride in India.
                </Typography>
              
                <Copyright />
            </Container>
        </footer>
    );
}

Footer.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};