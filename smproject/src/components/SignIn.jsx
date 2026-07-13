import React, { useState } from 'react';
// import { Link, Navigate,useNavigate } from 'react-router-dom';
import './SignIn.css';
import axios from '../axios';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/vbash_logo.png';
import bg from '../assets/vbash_bg.jpeg';
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';
import bgImage from "../assets/vbash_bg.jpeg";
import { Box } from '@mui/material';


function SignIn() {
    const [schoolId, setSchoolId] = useState('');
    const [password, setPassword] = useState('');
    const [{school},dispatch]=useStateValue();
    const navigate=useNavigate();
  
    function signin(e) {
        e.preventDefault();
        console.log(schoolId,password);
        axios.post('/vinterbash/validate',{schoolId,password})
        .then((response)=>{
         setSchoolId("");
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
            <Box style={{ "--vb-bg-image": `url(${bgImage})` }}>
        <div className='login' style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
           
                <img 
                  className='login_logo' 
                  src={logo} 
                  alt="Logo" 
                  style={{ filter: 'brightness(0) saturate(100%)', cursor: 'pointer' }}
                  onClick={()=>{
                    navigate(`/homepage`)
                  }}
                />
            

            <div 
              className='login_container'
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: 'none',
                color: '#000000',
                borderRadius: '12px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
                padding: '30px'
              }}
            >
                <h1 style={{ color: '#000000' }}> Sign In </h1>

                <form>
                    <h5 style={{ color: '#000000' }}>School ID</h5>
                    <input type='text' value={schoolId} onChange={(e) => setSchoolId(e.target.value)}/>
                    <h5 style={{ color: '#000000' }}>Password</h5>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button 
                      className='login_signin' 
                      type='submit' 
                      onClick={signin}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                        background: 'rgba(255, 255, 255, 0.35)',
                        backgroundImage: 'none',
                        border: 'none',
                        color: '#ffffff', // Changed to pure white text
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.03)'
                      }}
                    > 
                      Sign In
                    </button>
                </form>
                <p style={{color:"red", fontWeight: '600'}}>Please paste the exact School Name and Password given</p>
                <p style={{ color: '#000000' }}>
                    By Signing in here you accept to all our term and conditions
                </p>
                <p style={{ color: '#000000', fontWeight: '500' }}>For further queries contact : 7010089170</p>
            </div>
        </div>
        </Box>
        </AnimatedPage>
    );
}

export default SignIn;