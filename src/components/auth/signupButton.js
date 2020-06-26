import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const SignupButton = ({label, buttonStyle}) => {
    const history = useHistory();

    return (
        <div>
             <Button
                  onClick={() => history.push('/auth/signup')}
                  style={buttonStyle}
                >
                  {label}
                </Button> 
        </div>
    )
}

export default SignupButton
