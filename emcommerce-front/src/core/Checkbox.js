import React,{useState,useEffect} from 'react';


const Checkbox = ({categories,handleFilter}) => {

    const [checked,setChecked] = useState([])

    const handleToggle = c => () => {


        const currentCatergoryId = checked.indexOf(c) // return the first index of -1
        const newCheckedCategoryId= [...checked]

        // if currently checked was not already in checked state > push 
        // else pull/take off


        if(currentCatergoryId === -1){

            newCheckedCategoryId.push(c)
        }
        else{
            newCheckedCategoryId.splice(currentCatergoryId, 1)
        }

          console.log(newCheckedCategoryId);
          setChecked(newCheckedCategoryId);

          handleFilter(newCheckedCategoryId)

    }



    return categories.map((c,i) => (

        <li  key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c.id === -1)} type="checkbox" className="form-check-input"/>
            <label className="form-check-label">{c.name}</label>
        </li>
    ))




}


export default Checkbox;