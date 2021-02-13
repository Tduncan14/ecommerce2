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



     useEffect(() => {

        setValues({...values, formData: new FormData()})


     },[])



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




           
        const handleChange = name => event => {

            event.preventDefault()
          
            const value = name == 'photo' ? event.target.files[0] : event.target.value;
            
            formData.set(name,value)

            setValues({...values, [name]:value})
       
       
       
       
       
           }

           const clickSubmit =(event) =>{

            event.preventDefault()

            setValues({...values, error:'', loading:true})

            createProduct( user._id, token,formData)
            .then(data => {
                if(data.error){
                    setValues({...values, error:data.error})
                }

                else {
                    setValues({
                       ...values ,name:'',description:'', photo:'' ,price:'', quantity:'', loading:false, createdProduct:data.name
                    })
                }
            })


            
           }

        const newPostForm = () => (

            <form className="mb-3" onSubmit={clickSubmit}>
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
                    
                    <option value="602343f9a0ed8f26a8ee7de6">Pokemon</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Quantity</label>
                    <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity}/>
                </div>


                <div className="form-group">
                    <label>Shipping</label>
                    <select onChange={handleChange('shipping')} className="form-control" >
                     <option value ="0">no</option>
                     <option value ="1">yes</option>
                    <option value="602343f9a0ed8f26a8ee7de6">Pokemon</option>
                    </select>
                </div>


        <button className="btn btn-outline-primary"> Create Button</button>
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