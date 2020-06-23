import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';

import colors from '../../config/colors';
import dataServices from '../../services/dataServices';
import { toast } from 'react-toastify';

const Like = ({userId, isLikedByUser, contentId}) => {
    const [like, setLike] = React.useState(isLikedByUser);

    const handleLike = async () => {
        const oldLike = like;

        try {
            setLike(!like);
        const { data } = await dataServices.putData('content/like', { userId, contentId, like: !like });
            setLike(data.body.liked);
            toast.success('Liked it!');
        console.log(data.body);
        }
        catch (e) {
            setLike(oldLike);
            console.log(e.message);
            toast.error('Something went wrong!');
        }
    }

    return (
        <FavoriteIcon onClick={handleLike} style={{color: like ? colors.primary: ''}}/>
    )
}

export default Like
