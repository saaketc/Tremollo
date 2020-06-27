import React from 'react'
import { Button } from '@material-ui/core';
import { buttonStyleClose } from '../../config/buttonStyle';

const UploadButton = ({onClick}) => {
    return (
        <Button onClick={onClick} style={buttonStyleClose}>Upload music</Button>
    )
}

export default UploadButton
