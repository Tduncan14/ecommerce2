import {useState,useEffect}from 'react';
import Layout from '../core/Layout';
import {API}from '../config'

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


     const {name,email,password} = values


    const clickSubmit = (e) => {
        e.preventDefault()


     Signup({name,email,password})


    }

    // sending

    const Signup = (user) => {

        // console.log({name:'name',
        //              email:'email',
        //              password:'password'})

      fetch(`${API}/signup`,{
          method:"POST",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json",
          },
          body:JSON.stringify(user)
      })
       .then(response =>{

        return response.json()
       })
        .catch(err =>{
            console.log(err)
        })
 

    }


    const signUpForm = () =>(

         

        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control"/>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>



    )

     const handleChange = name => event => {


        setValues({...values,error:false, [name]:event.target.value})






     }


    return(
    <Layout title="Sign up" description="Sign up to the App"
     className="container col-md-8 offset-md-2">
        

        {signUpForm()}


        {JSON.stringify(values)}

     </Layout>

    )


}




export  default Signup