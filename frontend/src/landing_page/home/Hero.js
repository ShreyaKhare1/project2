import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
function Hero() {
  const navigate=useNavigate();
  return ( 
    <div className='container p5 mb-5'>
      <div className='row text-center' >
        <img src='images/homeHero.png' className='mb-5'></img>
        <h1 className='mt-5'>Invest in everything</h1>
        <p>Online platform to invest in stocks</p>
        <button className='btn btn-primary m-auto p-3 fs-5' style={{width:"30%"}}  onClick={() => navigate("/signup")}>SignUp</button>
      </div>
    </div>
   );
}

export default Hero;