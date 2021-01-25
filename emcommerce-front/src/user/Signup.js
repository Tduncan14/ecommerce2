import {useState,useEffect}from 'react';
import Layout from '../core/Layout';
import{Link} from 'react-router-dom';
import {API}from '../config'
import {signup} from '../auth/apiIndex'

const Signup = () => {

    // const [userName,setUsername] = useState('')
    // const [password,setPassword] = useState('')
    // const [email, setEmail] = useState('')


    const [ values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })


     const {name,email,password,success,error} = values


    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values,error:false})


     signup({name,email,password})
     .then(data =>{
         if(data.error){
             setValues({...values, error:data.error, success:false})

         }
         else{
             setValues({
                 ...values,
                 name:'',
                 email:'',
                 password:'',
                 error:'',
                 success:true
             })
         }
     })


    }

    // sending

   

    const signUpForm = () =>(

         

        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control"
                value={name}/>
            </div>

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


     const showSuccess = () => (
         <div className="alert alert-info" style={{display:success ?'':'none'}}>
               New Account is created. Please <Link to="/signin"> Sign  In </Link>
         </div>

     )

    return(
    <Layout title="Sign up" description="Sign up to the App"
     className="container col-md-8 offset-md-2">
        
        {showError()}
        {showSuccess()}
        {signUpForm()}


        {/* {JSON.stringify(values)} */}

     </Layout>

    )


}




export  default Signup