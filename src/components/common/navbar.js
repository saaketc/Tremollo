import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import HeadsetIcon from '@material-ui/icons/Headset';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withRouter } from 'react-router-dom';

import colors from '../../config/colors';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
        margin:20
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        color: colors.white,
        fontWeight:'700',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            
        },
        
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

function Navbar(props) {
   
    const { user } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchKeyword, setSearchKeyword] = React.useState('')
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    // handle studio click
    const handleStudioClick = () => {
        return props.history.push('/create-new-studio');
    }
    // logo click
    const handleLogoClick = () => {
        return props.history.push('/');
    }

    // handle auth button click
    const handleAuth = (authType) => {
        if (authType === 'login')
            return props.history.push('/auth/login');
        if (authType === 'signup')
            return props.history.push('/auth/signup');
    }
    const handlePlaylistOpen = () => {
        return props.history.push('/myPlaylist');
    }
    const handleLogout = () => {
        return props.history.push('/auth/logout');
    }
    const handleSearchChange = (e) => {
        const term = e.currentTarget.value;
        setSearchKeyword(term);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        return props.history.push(`/search?q=${searchKeyword}`);
        // console.log(searchKeyword);
    }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
       
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            
        >
            
                
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handlePlaylistOpen}>My playlist</MenuItem>
           
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
            
            
           
        </Menu>
        
    );



    return (
        <div className={classes.grow}>
            <AppBar position="static"
                style={{
                    backgroundColor: colors.primary }}>
                <Toolbar>
                   
                    
                        <Button onClick={handleLogoClick}  style={{ color:colors.white }}>Tremollo</Button>
          
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                            
                        <form onSubmit={handleSearchSubmit}>
                        <InputBase
                            placeholder="Search…"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            />
                            </form>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                       
                        {!user && 
                            <>
                            <Button style={{ fontSize: '20px' }} color="inherit" onClick={() => handleAuth('login')}>
                                Login
                        </Button>

                            <Button style={{ fontSize: '20px' }} color="inherit" onClick={() => handleAuth('signup')}>
                                Signup
                        </Button>
                        </>
                        }
                        {user &&
                            <>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={()=> props.history.push('/myMusic/upload')}
                                color="inherit"
                            >
                                <CloudUploadIcon/>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            </>
                        }
                    </div>
               
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}
export default withRouter(Navbar);