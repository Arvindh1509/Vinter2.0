import React, { useState } from 'react';
// import { Link, Navigate,useNavigate } from 'react-router-dom';
import './SignIn.css';
import axios from '../axios';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/vinterbash_2025_logo.png';
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';


function SignIn() {
    const [schoolName, setSchoolName] = useState('');
    const [password, setPassword] = useState('');
    const [{school},dispatch]=useStateValue();
    const navigate=useNavigate();

    function signin(e) {
        e.preventDefault();
        axios.post('/vinterbash/validate',{schoolName,password})
        .then((response)=>{
         setSchoolName("");
         setPassword("");
         alert("Logged In");
         console.log("School Name --->", response.data);
            dispatch({
                type:'login', 
                schoolName:response.data.schoolName,
                schoolId:response.data.schoolId,
                events:response.data.events
                
          });
          navigate("/dashboard");
         })
         .catch((error) => {
            console.error(error); // for debugging
            alert(error.response?.data?.error || "An unknown error occurred");
            });
    }
    return (
        <AnimatedPage>
        <div className='login'>
           
                <img className='login_logo' src={logo} alt="Logo" onClick={()=>{
                    navigate(`/homepage`)
                }}/>
            

            <div className='login_container'>
                <h1> Sign In </h1>

                <form>
                    <h5>School Name</h5>
                    <input type='text' value={schoolName} onChange={(e) => setSchoolName(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className='login_signin' type='submit' onClick={signin}> Sign In</button>
                </form>
                <p style={{color:"red"}}>Please paste the exact School Name and Password given</p>
                <p>
                    By Signing in here you accept to all our term and conditions
                </p>
                <p>For further queries contact : 7010089170</p>
            </div>
        </div>
        </AnimatedPage>
    );
}

export default SignIn;
