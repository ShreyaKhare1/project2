import React from 'react';
function Pricing() {
  return ( 
    <div className='container'>
      <div className='row'>
        <div className='col-4'>
          <h2>Unbeatable pricing</h2>
          <p className='text-muted'>
            We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
          </p>
          <a href='#'>See Pricing <i class="fa-solid fa-arrow-right-long"></i></a>
        </div>
        <div className='col-2'></div>
        <div className='col-6'>
          <div className='row text-center'>
            <div className='col border' >
              <h1><i class="fa-solid fa-indian-rupee-sign"></i>0</h1>
              <p className='text-muted'>Free equity delivery and
direct mutual funds</p>
            </div>
            <div className='col border'><h1><i class="fa-solid fa-indian-rupee-sign"></i>20</h1>
            <p className='text-muted'>Intraday and F&O</p></div>
          </div>
        </div>
      </div>
    </div>
   );
}

export default Pricing;