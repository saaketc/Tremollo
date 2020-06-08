import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import AudiotrackRoundedIcon from '@material-ui/icons/AudiotrackRounded';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
// import ShareIcon from '@material-ui/icons/Share';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

// video player
import VideoPlayer from '../videoPlayer';
import { thumbnailCreator, month } from '../../utils/utilfunctions';
import UImodalDemo from './UImodalDemo';
import  Button  from '@material-ui/core/Button';
import dataServices from '../../services/dataServices';
import Playlist from '../playlist';
import colors from "../../config/colors";
import dataService from "../../services/dataServices";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 300,
        maxHeight:'100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },

    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    heading: {
        fontWeight: 800
    },
    btnFan: {
        color: colors.white,
        border: `1px solid ${colors.primary}`,
        backgroundColor: colors.primary,
        fontSize:'12px',

        "&:hover": {
          backgroundColor: colors.primary,
        }
    },
    btn: {
        color: colors.primary,
        border: `1px solid ${colors.primary}`,
        backgroundColor: colors.white,
        fontSize:'12px',
        "&:hover": {
          backgroundColor: colors.white,
        }
    }
}));

const color = 'red';
export default function UIcard(props) {
    const { username, title, caption, avatar,  date, url, thumbnailLink, userId,  currentUserId, contentId,
        isLikedByUser, isFollowedByUser, likes, followers, addToPlaylist } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [like, setLike] = React.useState(isLikedByUser);
    const [likeCount, setLikeCount] = React.useState(likes);
    const [follow, setFollow] = React.useState(isFollowedByUser);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleLikeClick = async () => {
        let likeBeforeClick = like;
        let count = likeCount;
        try {
            setLike(!like);
            setLikeCount(like ? count++ : count--);
            const { data } = await dataServices.putData('content/like', { userId, contentId, like: !like });
            console.log(data);
            setLike(data.body.liked);

        }
        catch (e) {
            toast.error(e.message);
            console.log(e.message);
            setLike(likeBeforeClick);
        }
    }
    const handleFollowClick = async () => {
        try {
            setFollow(!follow);
        
        const toSend = {
            followerId:currentUserId,
           followedId:userId,
            follow:!follow
        }
        const { data } = await dataService.putData('user/follow', toSend);
        console.log(data.body);
        }
        catch (e) {
            console.log(e);
        }


    }
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img src={avatar} alt="user avatar" width='100%' height='100%'/>

          </Avatar>
                }
              
               
                action={
                    <Button className={follow ? classes.btnFan : classes.btn } onClick={handleFollowClick}>
                        {follow ? `Fan` : 'Become a fan'}</Button>
                   
                   
                } 
                title={username}
                subheader={followers > 0 ? `${followers} followers </br> ${month(new Date(date).getMonth())} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`
                    : `${month(new Date(date).getMonth())} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`}
            />
            <CardMedia
                className={classes.media}
                component={(props) => <VideoPlayer {...props} url={url} thumbnailLink={thumbnailLink}/>}
                
            />
            
        
            
            <CardContent>
                <Typography variant="h7" className={classes.heading} color="textSecondary">
                   {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {caption}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={handleLikeClick} style= {{ color:like ? color : ''   }} /> <small>{` ${likeCount} `}</small>
                </IconButton>
            
                {addToPlaylist &&
                    <Playlist
                        currentUserId={currentUserId}
                        contentId={contentId}
                    />
                }
                
                
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                   
                </IconButton>
            </CardActions>
          
        </Card>
    );
}