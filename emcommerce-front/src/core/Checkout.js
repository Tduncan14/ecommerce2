import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts,getBrainTreeClientToken} from './apiCore';
import Card from './Card';
import {isAuthenicated} from '../auth/apiIndex';
import DropIn from 'braintree-web-drop-in-react'
import {Link} from 'react-router-dom';


const Checkout = ({products}) => {


    const [data,setData] = useState({
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:''
    })

    // Getting the userID and token

    const userId = isAuthenicated() && isAuthenicated().user._id
    const token = isAuthenicated() && isAuthenicated().token

    const getToken = (userId,token) => {

        getBrainTreeClientToken(userId,token).then(data =>{


            console.log(data.clientToken,"in the function on checkout")

            if(data.error){

                setData({...data, error: data.error})

            }
            else{
               
                setData({...data, clientToken: data.clientToken})
                   console.log(data.clientToken)
            }
        })

    }

    
    console.log(userId,token)


    useEffect(() => {

        getToken(userId,token)

    },[])




       const getTotal = () => {

        return products.reduce((currentValue,nextValue) => {

         return currentValue + nextValue.count + nextValue.price

        },0)
    }

    const showCheckout = () => {

        {isAuthenicated() ? (
           <div>
               <h1> h1</h1>
               {showDropIn}
            </div>
        ) : (

            <Link  to="/signin">
                <button className="btn btn-primary">
                    Sign in to checkout
                </button>
            </Link>

        )}
    }


    const showDropIn = () => {


        //   console.log(console.table(data.clientToken, products.length))
        <div>
            {
                data.clientToken !== null && products.length > 0 ? 
                (
                  <div>
                  <DropIn options={{authorization:data.clientToken}}
                    onInstance={instance => data.instance = instance} />

                    <button className="btn btn-success">Checkout</button>
                </div>  


                ) :null
            }
        </div>
    }

    return <div>

    <h2>Total: ${getTotal()}</h2>
        
        

        {showDropIn()}
  
    </div>



}


export default Checkout