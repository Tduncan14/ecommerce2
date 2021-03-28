import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card'
import Search from './Search';


const Home = () => {

    const [productsBySell, setproductsBySell] = useState([])
    const [productByArrival, setProductsByArrival] = useState([])
    const [error,setError] = useState(false)


     const loadProductsBySell =() => {getProducts('sold').then(data => {

        console.log(data,'data')

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

    
    useEffect(() =>{
        loadProductsByArrival()
        loadProductsBySell()
    },[])


   return( <Layout title="Home Page" description="E-Commerce" className="contai
   ner-fluid">

<Search />

<h2 className="mb-4"> Arrived </h2>


<div className="row">
{    productByArrival.map((product,i) => (

    <Card key={i}  product={product}/>


)        )}
</div>

<hr />

           <h2 className="mb-4"> Best Sellers </h2>

           <div className="row">

           {productsBySell.map((product,i) => (

               <Card key={i}  product={product}/>

           ))}
           </div>

          

 
               
    </Layout>)
}






export default Home