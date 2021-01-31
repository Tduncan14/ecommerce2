import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isAuthenicated} from './apiIndex';


const AdminRoute = ({component: Component , ...rest}) => (



     <Route {...rest} render={props=> isAuthenicated()&& isAuthenicated().user.role === 1 ? (

        <Component{...props}/>


     ):(
         <Redirect to={{pathname:'/signIn', state:{from:props.location}}} />
     )}
     />

)

export default AdminRoute