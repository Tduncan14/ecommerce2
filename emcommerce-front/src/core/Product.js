import React,{useState,useEffect} from 'react';
import Layout from "./Layout";
import {getProducts} from './apiCore';
import Card from './Card';
import Search from './Search';


const Product = () => {


    const [product,setProduct] = useState({})
    const [error, setError] = useState(false)



    const loadSingleProduct = productId => {

        read().then(data => {


            if(data.error){
                setError(data.error)
            
        }

        else{

            setProduct(data)

        }
        
        




    })}


    useEffect(() =>{

        const productId = props.match.params.productId


        loadSingleProduct(productId)

        

    },[])






    return (

        <Layout 
          title="View Product"
          description="Node React E-commerce App"
          className="container-fluid">


              <p>Product page</p>


       <div className="row">{JSON.stringify(product)}</div>

          </Layout>

    )


    
}



export default Product