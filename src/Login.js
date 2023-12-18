import axios from 'axios';
import {BrowserRouter as Router, Routes, Route, Link,  } from 'react-router-dom';
import '../src/one.css';
import{
    useNavigate
} from "react-router-dom";
import React, {useState} from 'react'
import logoImage from './fotor.png';
import logoImage2 from './fotor2.jpg';

const Login=()=>{
    let navigate = useNavigate();

    const[user,setUser]=useState({email:'',password:''})

    const handleChange=(e)=>{
        setUser({...user, [e.target.name]: e.target.value});
    }

    const submitForm=(e)=>{
        e.preventDefault();
        const sendData={
            email:user.email,
            password:user.password
    
        }
    
         console.log(sendData);
        axios.post('http://localhost/php-react/login.php',sendData)
        .then((result)=>{
            console.log(result);
            if(result.data.status === '200') {
                window.localStorage.setItem('email', result.data.email);
                window.localStorage.setItem('userName', (result.data.first_name+ ' '+result.data.first_name));
                navigate('/dashboard');
            }
        else{
       
        alert('Invalid User');
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
        <form onSubmit={submitForm}>
        <div className="main-box1">
        <div className="row">
             <div className="col-md-12 text-center"> <h1 className='login1'> Login</h1></div>
        </div>
        
        <div className="row">
            
                
                  
                    <div className="col-md-6">Email:</div>
                 
                   
                    <div className="col-md-6"><input type="email" name="email" onChange={handleChange} value={user.email}/></div>

                   
               
            
        </div>

        <div className="row">
            
                
                    <div className="col-md-6">Password:</div>
                   
                    
                    <div className="col-md-6"><input type="password" name="password" 
            onChange={handleChange} value={user.password}
            /></div>
                    
                
            
           
            

        </div>

        <div className="row">
            <div className="col-md-12 text-center">
                <input type="submit" name="submit" className="btn btn-success" value="Login" />
            </div>
        </div>
        </div>
        </form>
        </>
    )

}

export default Login;