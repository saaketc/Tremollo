import React from 'react'
import { getUser } from '../../services/userServices';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <div>
            {
                getUser() ? 
                    <Route {...rest} render={(props) => <Component {...props} user={getUser()} />}/>
                        :
                         <Redirect to={{pathname:'/auth/login'}}/>
                        }
            </div>
    )
}

export default ProtectedRoute
