import React from 'react'
import './Header.css';
import { useStateValue } from '../StateProvider';

function Header() {

  const [{schoolName},dispatch]=useStateValue();

  return (
    <div>
    <div className='header'>
      <h1>Hi {schoolName}, Welcome to Vinterbash 2025 Event Registration</h1>
      </div>
    </div>
  )
}

export default Header
