import React from 'react'
import {Link,withRouter} from 'react-router-dom';


const isActive = (history,path) =>{


    if(history.location.pathname === path){

        return {color:'#ff9900'}
    }

    else{
        return {color: '#fff'}
    }
}


const Menu = () => {


 return(
    <div>
        <ul className="nav nav-tabs bg-primary" >
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
               
            </li>
            <li className="nav-item">
                
                <Link className="nav-link" to="/signIn">Sign In</Link>
               
            </li>

            <li className="nav-item">
                
                <Link className="nav-link" to="/signUp"> Sign Up</Link>
            </li>


        </ul>
    </div>
 )
}

export default withRouter(Menu);