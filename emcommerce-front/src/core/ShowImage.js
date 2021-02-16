import React from 'react';
import {API} from '../config';



const ShowImage = ({item,url}) => {

  <div className="product-img">


        <img  src={`${API}/${url}/${item.id}`}  alt={`${product.name}`}
        className="mb-3" style={{maxHeight:'100%', maxWidth:"100%"}} />

  </div>





}
export default ShowImage