import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const Header=()=>{
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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  {/* <a class="navbar-brand" href="#"></a> */}
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <Link to="/" class="nav-link">Home</Link>
      </li>

      <li class="nav-item">
      <Link to="/register" class="nav-link">Register</Link>
      </li>
      <li class="nav-item">
      <Link to="/login" class="nav-link">Login</Link>
      </li>
    </ul>
    <span class="navbar_text">
      Welcome: {user} | <Link to='' onClick={Logout}>logout </Link>
    </span>
   
  </div>
</nav>
    )
}

export default Header