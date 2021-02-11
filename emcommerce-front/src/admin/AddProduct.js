import React,{useState,useEffect} from 'react';
import Layout from "../core/Layout";
import {isAuthenicated} from '../auth/apiIndex';
import {Link} from 'react-router-dom';
import {createProduct} from './apiAdmin';



const AddProduct = () => {



    const {user,token} = isAuthenicated()


    const [values,setValues] = useState({

        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''

    })


    const {name
        ,description,
        price,
        categories,
        category,
        shipping,
        quantity,
        createdProduct,
        formData,
        redirectToProfile} = values



        const newPostForm = () => (

            <form className="mb-3">
                <h4>Phost Photo</h4>
                <div className="form-group">
                  <label className="btn btn-secondary">  
                  <input type="file" name="photo" accept="image/*"/>
                  </label>
                </div>
            </form>




        )
 

    return(
        <Layout

        title="Add a  new product"
        description="Adding new product">

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                </div>
            </div>



        </Layout>
    )
}

export default AddProduct;