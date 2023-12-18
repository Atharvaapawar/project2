// import {useEffect, useState} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// const Dashboard=()=>{
//     const [auth,setAuth]=useState('');
//     let navigate= useNavigate();
//     useEffect(()=>{
//         var auth = localStorage.getItem('email');
        

//         setAuth(auth);
       
//     },
//     [])
//     if(auth==null){
//         navigate('/login');
//       }
//     return(
//         <div>
//           Welcome to Home Private Page
//         </div>
//     )

// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import DateTimePicker from 'react-datetime-picker';
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import logoImage from './fotor.png';
import logoImage2 from './fotor2.jpg';




export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [dbUsers, setDBUsers] = useState([]);
    const [fromTimestamp, setFromTimestamp] = useState(null);
    const [toTimestamp, setToTimestamp] = useState(null);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [value, setValue] = useState("10:00");
    let navigate= useNavigate();
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/php-react/index.php').then(function (response) {
            console.log(response.data);
            response.data.sort(function(a, b) {
                return a.timestamp < b.timestamp;
            });

            setUsers(response.data);
            setDBUsers(response.data);
        });
    }

    const deleteUser = (id) => {
      console.log(id)
      const data = {user_id : id, method:'DELETE'}
        axios.post(`http://localhost/php-react/index.php`, data).then(function (response) {
            console.log(response.data);
            getUsers();
        });
    }

    const removeFilter = () => {
        setUsers(dbUsers)
    }

    const handleFilter = () => {
        // Filter the users based on the "from" and "to" timestamps
        const filteredUsers = users.filter(user => {
            const timestamp = user.timestamp;
            var t = timestamp.split(/[- :]/);
            console.log("from time", fromTimestamp)
            console.log("to time", toTimestamp)
            

// Apply each element to the Date function
var timenew = Date.parse(new Date(Date.UTC(t[0], t[1]-1, t[2])));
console.log("curr", timenew)
            return ( timenew >= fromTimestamp) && ( timenew <= toTimestamp);
        });
        setUsers(filteredUsers);
    }

    const Logout = ()=>{
        localStorage.removeItem('email');
        localStorage.clear();
        navigate('/login');
      }

    return (
        // style={{height: "500px", width: "100%"}}
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
            <Link class="navlink" to="/">logout</Link>
          
      </div>
      
    </nav>
        <div>
            <h1 class="listentry">List Entries</h1>
            <div class="filter"> 
                <label >From time  <DatePicker

selected={startDate}
onChange={(date) => {
  let date_timestamp = Date.parse(date);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let miliseconds = date.getMilliseconds();
  let time = date.getTime();
  let date_Date =
    time -
    hours * 3600 * 1000 -
    minutes * 60 * 1000 -
    seconds * 1000 -
    miliseconds;
  console.log(date_Date);
  console.log(new Date(date_Date));
  setStartDate(date_Date);
  setFromTimestamp(date_Date);
}}
/></label>
            <label style={{display : "inline"}}>To Time <DatePicker
              selected={endDate}
              onChange={(date) => {
                let date_timestamp = Date.parse(date);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                let miliseconds = date.getMilliseconds();
                let time = date.getTime();
                let date_Date =
                  time -
                  hours * 3600 * 1000 -
                  minutes * 60 * 1000 -
                  seconds * 1000 -
                  miliseconds;
                console.log(date_Date);
                console.log(new Date(date_Date));
                setEndDate(date_Date);
                setToTimestamp(date_Date);

              }}
            /></label>
            
            
                <button onClick={handleFilter}>Filter</button>
                <button onClick={removeFilter}>Remove Filter</button>
            </div>
            {/* <TimePicker
              onChange={(time) => {
                setValue(time);
              }}
              value = {value}
            /> */}
            <table class="table">
                <thead>
                    <tr class="throw">
                        <th class="tablehead">plate_id</th>
                        <th class="tablehead">x1</th>
                        <th class="tablehead">y1</th>
                        <th class="tablehead">x2</th>
                        <th class="tablehead">y2</th>
                        <th class="tablehead">plate_text</th>
                        <th class="tablehead">plate_confidence</th>
                        <th class="tablehead">registered</th>
                        <th class="tablehead">frame_nmr</th>
                        <th class="tablehead">car_id</th>
                        <th class="tablehead">timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => (
                        <tr key={key}>
                            <td class="tablebody">{user.plate_id}</td>
                            <td class="tablebody">{user.x1}</td>
                            <td class="tablebody">{user.y1}</td>
                            <td class="tablebody">{user.x2}</td>
                            <td class="tablebody">{user.y2}</td>
                            <td class="tablebody">{user.plate_text}</td>
                            <td class="tablebody">{user.plate_confidence}</td>
                            <td class="tablebody">{user.registered}</td>
                            <td class="tablebody">{user.frame_nmr}</td>
                            <td class="tablebody">{user.car_id}</td>
                            <td class="tablebody">{user.timestamp}</td>
                            {/* <td >
                                <button onClick={() => deleteUser(user.car_id)} style={{ backgroundColor: "#010101", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer" }}>Delete</button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}
