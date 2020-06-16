import React from 'react'
import { Grid, Typography } from '@material-ui/core';

import CardComponent from '../common/cardComponent';
import { storageURL } from '../../config/storage';

const UserContent = ({content, onClick}) => {
   return (
       <div>
            
           {content.length === 0 &&
              <Typography variant='h5'>
              Ooops! No uploads yet.
              </Typography>
          }
               
          <Grid container spacing={6}>
         
             {content &&
            content.map((c) => (
                
                <Grid item xs={12} md={4} lg={4}>
               
                    <CardComponent
                data={c}
                primaryData={c.title}
                secondaryData={c.username}
                onClick={onClick}
                image={storageURL + c.thumbnailLink}
              />
                </Grid>
    
              ))}
          </Grid>
            
            </div>
    )
}

export default UserContent
