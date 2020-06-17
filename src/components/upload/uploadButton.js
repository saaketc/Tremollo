import React from 'react'
import { Button } from '@material-ui/core';
import { buttonStyleOpen } from '../../config/buttonStyle';

const UploadButton = ({onClick}) => {
    return (
        <Button onClick={onClick} style={buttonStyleOpen}>Upload music</Button>
    )
}

export default UploadButton
