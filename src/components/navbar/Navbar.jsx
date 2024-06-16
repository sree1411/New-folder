import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
     <>
        <div className="navbar">
            <div className='navbar1'>
              <Link to={'/'}>
              <img id='navbarImg' src="https://st.depositphotos.com/1007168/2969/i/450/depositphotos_29692165-stock-illustration-red-blood-drop-cartoon-character.jpg" alt="" width='50px' height="50px" /> 
              
              </Link>
            </div>
            <div className='navbar2'>
                <p> Blood Donation </p>
            </div>
        </div>
     </>
  )
}

export default Navbar;