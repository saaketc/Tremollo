import React from 'react';
import { withRouter } from 'react-router-dom';

const Studio = (props) => {
    
    return (
        <h1>Welcome to {props.match.params.studioName}</h1>
    )
}

export default withRouter(Studio);