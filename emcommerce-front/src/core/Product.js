import React,{useState,useEffect} from 'react';
import Layout from "./Layout";
import {getProducts} from './apiCore';
import Card from './Card';
import Search from './Search';


const Product = () => {







    return (

        <Layout 
          title="View Product"
          description="Node React E-commerce App"
          className="container-fluid">


              <p>Product page</p>



          </Layout>

    )


    
}



export default Product