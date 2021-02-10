import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenicated} from '../auth/apiIndex';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin'


const AddCategory = () => {

    const [name,setName] = useState('')
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)


    const handleChange = (e) => {

        setError('')
        setName(e.target.value)




    }


       // destructure use and token from localStorage

       const{user,token} = isAuthenicated()



    const clickSubmit = (e) =>{

        e.preventDefault()
        setError(false)
        setSuccess(false)

        // male request api to create category
        createCategory(user._id,token,{name})

        .then(data =>{

            if(data.error){
                setError(true)
            }
            else{
                setError(false);
                setSuccess(true);
            }
        })
    }



 

    const newCategoryForm = () => (


      <form onSubmit={clickSubmit}>
          <div className="form-group">
              <label className="text-muted">Name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </label>
              <input type="text"
               className="form-control" 
               onChange={handleChange}
               value={name}
               autoFocus
               required/>
          </div>

          <button className="btn btn-outline-primary">
              create Category
          </button>
      </form>

    )


     const showSuccess = () => {


        if(success){
            return <h3 className="text-success">{name} is created </h3>
        }
     }

     
     const showError = () => {


        if(error){
            return <h3 className="text-danger">{name}  should be uniqued </h3>
        }
     }


   return (

    <Layout title="Add a new category" 
    description={` ${user.name} is creating a category`} 
    >

    <div className="row">

   

        <div className="col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
           

        </div>


    </div>

   
</Layout>


   )


}



export default AddCategory