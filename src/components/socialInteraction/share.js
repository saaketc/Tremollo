import React from 'react'
import ShareIcon from '@material-ui/icons/Share';
import SimpleModal from '../common/simpleModal';

const Share = () => {
    return (
        <SimpleModal
            title='Enjoyed it! Copy this link & share it with others too...'
            secTitle={window.location.href}
            label='Share'/>

    )
}

export default Share
