import {useState,useEffect}from 'react';
import Layout from '../core/Layout';
import{Link,Redirect} from 'react-router-dom';
import {API}from '../config'
import {signin} from '../auth/apiIndex'
import {authenicate} from '../auth/apiIndex'

const Signin = () => {

    // const [userName,setUsername] = useState('')
    // const [password,setPassword] = useState('')
    // const [email, setEmail] = useState('')


    const [ values, setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading :false,
        redirectToReferrer:false
    })


     const {email,password,loading,error,redirectToReferrer} = values


    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values,error:false,loading:true})


     signin({email,password})
     .then(data =>{
         if(data.error){
             setValues({...values, error:data.error, loading:false})

         }
         else{
            //  setValues({
            //      ...values,
            //     redirectToReferrer:true
            //  })

            authenicate(data,
                ()=>{
                      setValues({
                 ...values,
                redirectToReferrer:true
             })


                })
         }
     })


    }

    // sending

   

    const signUpForm = () =>(

         

        <form>
          
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>



    )

     const handleChange = name => event => {


        setValues({...values,error:false, [name]:event.target.value})






     }

     const showError = ()=>(
         <div className="alert alert-danger" style={{display:error ? '':'none'}}>
             {error}
         </div>
     )


     const showLoading = () => (
        loading && (<div className="alert alert-info">
            <h2>Loading...</h2>
        </div>)

     )

     const redirectUser = () =>{

        if( redirectToReferrer
            ){

            return<redirect to='/'/>;
        }
     }

    return(
    <Layout title="Sign in" description="Sign up to the App"
     className="container col-md-8 offset-md-2">
        
        {showError()}
        {showLoading()}
        {signUpForm()}
        {redirectUser()}


        {/* {JSON.stringify(values)} */}

     </Layout>

    )


}




export  default Signin