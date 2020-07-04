import React from 'react'
import FeedItem from './feedItem'
import ReactLoading from "react-loading";
import darkTheme from '../../config/themes/dark';

const FeedGrid = ({ items, isLoading }) => {
  return isLoading ? (
    <div class="d-flex justify-content-center align-items-center" style={{ marginTop: '10rem'}}>
           <ReactLoading
        type="spokes"
        color={darkTheme.primary}
        height={100}
            width={100}
          
            />
    </div>
   
  ) : (
    <section className='cards'>
      {items.map((item) => (
        <FeedItem key={item.title} item={item}></FeedItem>
      ))}
    </section>
  )
}

export default FeedGrid
