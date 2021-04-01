import React,{useState,useEffect} from 'react';
import Layout from "./Layout";
import {read,listRelated} from './apiCore';
import Card from './Card';
import Search from './Search';


const Product = (props) => {


    const [product,setProduct] = useState({})
    const [error, setError] = useState(false)
    const [relatedProduct,setrelatedProduct] = useState([])


    const loadSingleProduct = productId => {

        read(productId).then(data => {


            if(data.error){
                setError(data.error)
            
        }

        else{

            setProduct(data)
            //  fetch related products

            listRelated(data._id).then(data =>{
                if(data.error){
                    setError(data.error)
                }
                else{

                }
            })



        }
        
        




    })}


    useEffect(() =>{

        const productId = props.match.params.productId


        loadSingleProduct(productId)

        

    },[])








    return (

        <Layout 
          title={product && product.name}
          description={ product && product.description && product.description.substring(0,100)}
          className="container-fluid">


              <div className = "row">

                  {
                      product &&
                      product.description &&

                      <Card  product={product}
                      showViewProductButton={false}/>
                  }




              </div>


       

          </Layout>

    )


    
}



export default Product