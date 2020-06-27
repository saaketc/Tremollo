import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';

import colors from '../../config/colors';
import dataServices from '../../services/dataServices';
import { toast } from 'react-toastify';

const Like = ({userId, isLikedByUser, contentId, postLike, likeCount}) => {
    const [like, setLike] = React.useState(isLikedByUser);
    const [count, setCount] = React.useState();
     
    React.useEffect(() => {
        setCount(likeCount);
    }, [likeCount]
    )
        
    const handleLike = async () => {
        const oldLike = like;

        try {
            let c = !like ? count + 1 : count - 1;
            postLike(c);
            setCount(c);

            setLike(!like);
        const { data } = await dataServices.putData('content/like', { userId, contentId, like: !like });
            setLike(data.body.liked);
            // postLike(data.body.liked ? 1 : -1);
        // console.log(data.body.liked);
        }
        catch (e) {
            setLike(oldLike);
            console.log(e.message);
            toast.error('Something went wrong!');
        }
    }

    return (
        <>
            {
                like ? 
                    <FavoriteIcon onClick={handleLike} style={{ color: colors.primary }} />
                    :
                    <FavoriteBorderSharpIcon onClick={handleLike}  />
            }
          
            </>
    )
}

export default Like
