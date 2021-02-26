import React, {useState,useEffect} from 'react';
import Layout from "./Layout";
// import {getProducts} from './apiCore';
import Card from "./Card";
import {getCategories} from './apiCore';
import Checkbox from './Checkbox';
import {prices} from "./fixedPrices";
import RadioBox from './RadioBox' ;



const Shop = () => {

    const [myFilters,setMyFilters] = useState({

        filters: {categories:[], prices:[]}
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


          if(filterBy === 'price'){

            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] =priceValues

          }


          loadFilteredResults(myFilters.filters)


          setMyFilters(newFilters);

    }


    const handlePrice = value => {

        const data = prices
        let array = []

        for(let key in data) {

            if(data[key]._id ===parseInt(value)){

                array = data[key].array
            }


        }
         return array
    }


    const loadFilteredResults = (newFilters) => {
          return  console.log(newFilters,'backend')

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

            <h4>Filter by prices</h4>

                <div>
                    <RadioBox
                      prices={prices}
                      handleFilter={filter =>
                           handleFilter(filter,
                            "price")} />

                </div>


                 </div>


                 <div className="col-8">
                     {JSON.stringify(myFilters)}
                 </div>

             </div>


         </Layout>


    )
}

export default Shop;