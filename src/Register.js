
import axios from 'axios';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../src/one.css';
import logoImage from './fotor.png';
import logoImage2 from './fotor2.jpg';


const Register=()=>{
    const [auth,setAuth]=useState('');
const [user,setUser]=useState('');
let navigate= useNavigate();
useEffect(()=>{
  var userName = localStorage.getItem('userName');
  setUser(userName);
},
[])

const Logout = ()=>{
  localStorage.removeItem('email');
  localStorage.clear();
  navigate('/login');
}
    let history = useNavigate();
    const[data, setData]=useState({
        first_name:"",
        last_name:"",
        email:"",
        password:""
    })


    const handleChange=(e)=>
{
    setData({...data,[e.target.name]: e.target.value});  
    console.log(data)
}

const submitForm=(e)=>{
    e.preventDefault();
    const sendData={
        first_name:data.first_name,
        last_name:data.last_name,
        email:data.email,
        password:data.password

    }

    console.log(sendData);
    axios.post('http://localhost/php-react/insert.php',sendData)
    .then((result)=>{
        if(result.data.Status == 'Invalid') {
        alert('Invalid User');
        }
    else{
    history('/login');
    }
    })
}
    return(
        <>
       <nav class="outerbox">
       <div class="innerbox">
        <img className="logoimage" src={logoImage}></img>
            
      </div>
      <div class="innerbox">
        <img className="logoimage2" src={logoImage2}></img>
            
      </div>
      <div class="innerbox">
            <Link class="navlink" to="/">Home</Link>
          
      </div>
      <div class="innerbox">
      <Link class="navlink" to="/register">Register</Link>

      </div>
      <div class="innerbox">
      <Link class="navlink" to="/login">Login</Link>

      </div>
      
        </nav>
        <div className="main-box">
        <form onSubmit={submitForm}>
        <div className="row">
        <div className="col-md-12 text-center"><h1>Register</h1></div>
        </div>
            <div className="row">
                <div className="col-md-6">First Name</div>
                <div className="col-md-6">
                    <input type="text" name="first_name" className="form-control" 
                    onChange={handleChange} value={data.first_name}
                    />
                </div>
                
            </div>


            <div className="row">
                <div className="col-md-6">Last Name</div>
                <div className="col-md-6">
                    <input type="text" name="last_name" className="form-control"
                    onChange={handleChange} value={data.last_name}
                    />
                    
                </div>
                
            </div>


            <div className="row">
                <div className="col-md-6">Email</div>
                <div className="col-md-6">
                    <input type="text" name="email" className="form-control"
                    onChange={handleChange} value={data.email}
                    />
                </div>
                
            </div>



            <div className="row">
                <div className="col-md-6">Password</div>
                <div className="col-md-6">
                    <input type="password" name="password" className="form-control"
                    onChange={handleChange} value={data.password}
                    />
                </div>
                
            </div>



            <div className="row">
                <div className="col-md-12 text-center">
                    <input type="submit" name="submit" value="Register" className="btn btn-success"/>
                </div>
                
            </div>
            </form>
        </div>
        </>
    )

}

export default Register;