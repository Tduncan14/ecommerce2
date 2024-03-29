import React from 'react'
import {Link,withRouter} from 'react-router-dom';
import {signout,isAuthenicated} from '../auth/apiIndex';
import {Dashboard} from '../user/Userdashboard';
import {itemTotal} from './cartHelper';

const isActive = (history,path) =>{


    if(history.location.pathname === path){

        return {color:'#ff9900'}
    }

    else{
        return {color: '#fff'}
    }
}


const Menu = ({history}) => {


 return(
    <div>
        <ul className="nav nav-tabs bg-primary" >
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
               
            </li>


            <li className="nav-items">

                <Link 
                  className="nav-link"
                  style={isActive(history,"/shop")}
                  to="/shop">
                      Shop
                  </Link>
            </li>


            <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history,"/cart")}
                  to="/cart"
                  >
                      Cart <sup><small className="cart-badge">
                          {itemTotal()}
                          </small></sup>
                  </Link>
            </li>




    {
          isAuthenicated()&&isAuthenicated().user.role === 0 && (
            <li className="nav-item">
            <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
           
     </li>)
    }
    {
    
        isAuthenicated()&&isAuthenicated().user.role ===  1 && (
          <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
         
      </li> )
  }







             {!isAuthenicated()&&(
                 <>
                      <li className="nav-item">
                
                      <Link className="nav-link"  style={isActive(history, '/Signin')}  to="/signIn">Sign In</Link>
                     
                  </li>
      
                  <li className="nav-item">
                      
                      <Link className="nav-link"  style={isActive(history, '/Signup')} to="/signUp"> Sign Up</Link>
                  </li>
                </>
      
             )   
}
       
          
          {isAuthenicated() && (
                 <li className="nav-item">
           
                 <span 
                   className="nav-link"
                   style={{cursor:"pointer", color:'#fffff'}}
                   onClick={()=> signout(() => {
    
                      history.push('/')
                   })}>
    
                       Sign out
                   </span>
                    
    
                </li>
          )}


        </ul>
    </div>
 )
}

export default withRouter(Menu);