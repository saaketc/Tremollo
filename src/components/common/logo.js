import React from 'react'
import { Typography } from '@material-ui/core'
import logo from '../../logo/logo.svg';
import colors from '../../config/colors';

const Logo = () => {
    return (
        <div>
              <Typography  align='left' variant="subtitle2">
          <a href="/" style={{ textDecoration: "none", color: colors.primary }}>
            <img src={logo} alt="tremollo music" />
          </a>
        </Typography>
        </div>
    )
}

export default Logo
