import React from 'react'

const Logout = () => {
   
    React.useEffect(() => {
        localStorage.removeItem('user');    
        return window.location.href = '/';
    }, []);

    return null
}

export default Logout
