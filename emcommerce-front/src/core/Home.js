import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';


const Home = () => {

    const [productsBySell, setproductsBySell] = useState([])
    const [productByArrival, setProductsByArrival] = useState([])
    const [error,setError] = useState(false)


     const loadProductsBySell =() => {getProducts('sold').then(data => {

        if(data.error){
            setError(data.error)
        }
        else{
            setproductsBySell(data)
        }

      })
    }


      const loadProductsByArrival = () => {

        getProducts('createdAt').then((data) => {if(data.error){
            setError(data.error)
        }
        else{
            setProductsByArrival(data)
        }

    })

      
    }




   return( <Layout title="Home Page" description="E-Commerce">

    </Layout>)
}






export default Home