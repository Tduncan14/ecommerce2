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


    const handleChange = name = e => {

     e.preventDefault()
     const [name] = setValues(name)





    }


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
                  <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
                  </label>
                </div>

                <div className="form-group">
                    <label>name</label>
                    <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
                </div>

                <div className="form-group">
                    <label>description</label>
                    <textarea onChange={handleChange('description')} type="text" className="form-control" value={description}/>
                </div>

                <div className="form-group">
                    <label>price</label>
                    <input onChange={handleChange('price')} type="number" className="form-control" value={price}/>
                </div>

                <div className="form-group">
                    <label>category</label>
                    <select onChange={handleChange('category')} className="form-control" >


                    </select>
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