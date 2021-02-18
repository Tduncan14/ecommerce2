import React, {useState,useEffect} from 'react';
import Layout from "./Layout";
// import {getProducts} from './apiCore';
import Card from "./Card";
import {getCategories} from './apiCore';
import Checkbox from './Checkbox';


const Shop = () => {

    const [myFilters,setMyFilters] = useState({

        filters: {categories:[], price:[]}
    })
    const[categories,setCategories] = useState([])
    const[error,setErrors] = useState([false])









    
    const init = () => {
        getCategories().then(data => {

            if(data.error){
                setErrors(data.error)
            }


            else{
                setCategories(data)
            }
        })
    }


    useEffect(()=>{

        init()

    },[])


    const handleFilter = (filters, filterBy) => {
          console.log(filters, filterBy)


          const newFilters = {...myFilters}

          newFilters.filters[filterBy] = filters


          setMyFilters(newFilters);


    }

    return(
        <Layout
         title="Shop page"
         description="Look at the items to shop"
         className="container-fluid">

             <div className="row">

                 <div className="col-4">\
                 <h4> Filter by categories</h4>
                    <ul>
                      <Checkbox categories={categories}  handleFilter={ filters => handleFilter(filters,'category')}/>
                      </ul>
                 </div>


                 <div className="col-8">
                     {JSON.stringify(myFilters)}
                 </div>

             </div>


         </Layout>


    )
}

export default Shop;