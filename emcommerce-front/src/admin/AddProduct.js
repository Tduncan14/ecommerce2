import React,{useState,useEffect} from 'react';
import Layout from "../core/Layout";
import {isAuthenicated} from '../auth/apiIndex';
import {Link} from 'react-router-dom';
import {createProduct} from './apiAdmin';



const AddProduct = () => {



    const {user,token} = isAuthenicated()


    return(
        <Layout

        title="Add a  new product"
        description="Adding new product">

            <div className="row">
                <div className="col-md-8 offset-md-2">...</div>
            </div>



        </Layout>
    )
}

export default AddProduct;