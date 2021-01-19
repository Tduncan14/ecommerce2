import React from 'react';
import Menu from './Menu';


const layout = ({title = 'Title',description ='description',children ,className}) => (

<>
   <Menu />

    <div className="jumbotron">

 <div>
    <h2>{title}</h2>
    <p className="lead">{description}</p>
  </div>

    <div className={className}>{children}</div>

    </div>

</>

)



export default layout