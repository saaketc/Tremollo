import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import VideoPlayer from '../videoPlayer';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function CardComponent({ data, property, secondaryData, image, url, thumbnailLink, player, onClick}) {
    const classes = useStyles();

    return (
        <Card className={classes.root} onClick={onClick ? ()=>onClick(data) : ()=> null}>
            <CardActionArea>
                {player ?
                    
                    <CardMedia
                        className={classes.cover}
                        component={(props) => <VideoPlayer {...props} url={url} thumbnailLink={thumbnailLink} />}

                        title={data[property]}
                    />
                    :
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={data[property]}
                        />
                        
                }
               
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data[property]}
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {secondaryData}
          </Typography>
                </CardContent>
            </CardActionArea>
            
        </Card>
    );
}