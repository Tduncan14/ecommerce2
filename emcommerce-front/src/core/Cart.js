import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {getCart} from './cartHelper';
import Card from './Card';
import {Link} from 'react-router-dom';



const Cart = () => {


    const [items, setItems] = useState([]);



    useEffect(() => {

        setItems(getCart())

        console.log(setItems(getCart()),'the function')

        console.log(items,'this is the items')





    },[])

    const showItems = (cart) => {



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
    //  no items


    const noItemsMessage =() => {

        <h2> Your cart is empty
        <br />
        <Link to="/shop">Continue Shopping</Link>

        </h2>
    }


    return(
        <Layout
         title="Shopping Cart"
         description="Manage your cart Items. Add remove checkout or continue shopping"
         className="container-fluid">




            <div className="row">
                <div className="col-6">
                    {
                     items.length > 0 ? showItems(items) : noItemsMessage
                    }
                </div>

                <div className="col-6">
                    <p> Show check options/shipping address/total/update quantity</p>
                </div>
            </div>



         </Layout>
    )



    
}

export default Cart