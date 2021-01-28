import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isAuthenicated} from './index';


const PrivateRouter = ({componet: Component , ...rest}) => (



     <Route {...rest} render={props=> isAuthenicated()?(

        <Component{...props}/>


     ):(
         <Redirect to={{pathname:'/signin', state={from:props.location}}} />
     )}
     />

)