// import React from 'react';
// function Awards() {
//   return ( 
//     <div className='container mt-5'>
//       <div className='row'>
//         <div className='col-6 p-5' >
//           <img src='images/largestBroker.svg'></img>
          
//         </div>
//         <div className='col-6 mt-3'>
//             <h1>Largest stockBroker in India</h1>
//             <p>2+million clients</p>
//             <ul >
//               <li><p>Customer-first always</p></li>
//               <li><p>No spam or gimmicks</p></li>
//               <li><p>Not just an app, but a whole ecosystem.</p></li>
//               <li><p>Do better with money</p></li>
//             </ul>
//             <img src='images/pressLogos.png' style={{width:"90%"}}></img>
//           </div>
          
//       </div>
//     </div>
//    );
// }

// export default Awards;

import React from 'react';

function Awards() {
  return (
    <div className='container mt-5'>
      <div className='row align-items-center'>

        <div className='col-12 col-md-6 p-3 p-md-5'>
          <img
            src='images/largestBroker.svg'
            className='img-fluid'
            alt='Largest stock broker'
          />
        </div>

        <div className='col-12 col-md-6 mt-3'>
          <h1>Largest stockBroker in India</h1>
          <p>2+million clients</p>

          <ul>
            <li>Customer-first always</li>
            <li>No spam or gimmicks</li>
            <li>Not just an app, but a whole ecosystem.</li>
            <li>Do better with money</li>
          </ul>

          <img
            src='images/pressLogos.png'
            className='img-fluid'
            style={{ width: '90%' }}
            alt='Press logos'
          />
        </div>

      </div>
    </div>
  );
}

export default Awards;
