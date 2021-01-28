import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isAuthenicated} from './apiIndex';


const PrivateRoute = ({component: Component , ...rest}) => (



     <Route {...rest} render={props=> isAuthenicated() ? (

        <Component{...props}/>


     ):(
         <Redirect to={{pathname:'/signIn', state:{from:props.location}}} />
     )}
     />

)

export default PrivateRoute