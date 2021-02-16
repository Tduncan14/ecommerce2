import React from 'react';
import {API} from '../config';



const ShowImage = ({item,url}) => {


    console.log(url,'this is the url')

 return( <div className="product-img">


        <img  src={`${API}/product/photo/${item._id}`}  alt={`${item.name}`}
        className="mb-3" style={{maxHeight:'100%', maxWidth:"100%"}} />

  </div>
 )





}
export default ShowImage