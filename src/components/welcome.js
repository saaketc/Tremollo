import React from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
const Welcome = () => {
  return (
    <>
      <h1>Tremollo Music</h1>
      <Button onClick={()=> window.location.href='/auth/signup'}>Get started</Button>
    </>
  )
}

export default Welcome
