import React from 'react';


const layout = ({title = 'Title',description ='description',children ,className}) => (


    <div className="jumbotron">Home

 <div>
    <h2>{title}</h2>
    <p className="lead">{description}</p>
  </div>

    <div className={className}>{children}</div>
    
    </div>



)



export default layout