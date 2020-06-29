import React from 'react'
import { removeUser } from '../../services/userServices';

const Logout = () => {
   
    React.useEffect(() => {
        removeUser();    
        return window.location.href = '/';
    }, []);

    return null
}

export default Logout
