import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {getCart} from './cartHelper';
import Card from './Card';



const Cart = () => {


    const [items, setItems] = useState([]);



    useEffect(() => {

        setItems(getCart())





    },[])

    const showItems = (items) => {



        return(
            <div>
                <h2>Your cart has {`${cart.length}`} items</h2>
                <hr />
                {items.map((product,i) => (

                    <Card key={i} product={product} />
                    
                ))}
            </div>
        )


    }


    return(
        <Layout
         title="Shopping Cart"
         description="Manage your cart Items. Add remove checkout or continue shopping"
         className="container-fluid">



         </Layout>
    )



    
}