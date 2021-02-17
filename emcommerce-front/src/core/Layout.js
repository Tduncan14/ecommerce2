import React from 'react';
import Menu from './Menu';
import '../styles.css'


const layout = ({title = 'Title',description ='description',children ,className}) => (

<>
   <Menu />

    <div className="jumbotron">

 <div>
    <h2>{title}</h2>
    <p className="lead">{description}</p>
  </div>
  </div>

    <div className={className}>{children} </div>

   

</>

)



export default layout