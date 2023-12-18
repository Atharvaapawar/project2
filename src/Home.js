import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../src/one.css';
import logoImage from './fotor.png';
import logoImage2 from './fotor2.jpg';

const Home=()=>{
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





<div className='home-main'>
        <h1 className='text1'>Number Plate Detection and Recognition System</h1> 
        <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Non arcu risus quis varius quam. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Iaculis eu non diam phasellus. 
       </p>


</div>
       
        </>
    )

}

export default Home;