import React, {useState,useEffect} from 'react';
import Layout from "./Layout";
// import {getProducts} from './apiCore';
import Card from "./Card";
import {getCategories,getFilteredProducts} from './apiCore';
import Checkbox from './Checkbox';
import {prices} from "./fixedPrices";
import RadioBox from './RadioBox' ;



const Shop = () => {

    const [myFilters,setMyFilters] = useState({

        filters: {categories:[], prices:[]}
    })
    const[categories,setCategories] = useState([])
    const[error,setErrors] = useState([false])
    const[limit,setLimit] = useState(6)
    const[skip,setSkip] = useState(0)
    const [filteredResults, setFilteredResults] = useState([]);
 



    
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


    const loadFilteredResults = (newFilters) => {
        // return  console.log(newFilters,'backend')

        getFilteredProducts(skip,limit,newFilters)
        .then(data => {

            if(data.error){
                setErrors(data.error)
            }

            else{

                setFilteredResults(data.data)

            }

        })

  }


    useEffect(()=>{

        init()


        loadFilteredResults(skip,limit,myFilters.filters)

        console.log(filteredResults)

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
                    <h2 className="mb-4"> Products</h2>
                    <div className="row">

                        {filteredResults.map((product,i) => (
                            
                            
                           
                           <Card key={i} product={product}/>
                        
                            )

                        )}

                    </div>
                 </div>

             </div>


         </Layout>


    )
}

export default Shop;