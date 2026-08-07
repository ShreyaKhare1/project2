import React from 'react';
function LeftSection({imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore}) {
  return ( 
    <>
    <div className='container'>
      <div className='row'>
        <div className='col-6 p-3'>
          <img src={imageURL}></img>
        </div>
        <div className='col-6'>
          <h1 className='fs-2'>{productName}</h1>
          <p>{productDescription}</p>
          <div className='mb-5' >
            <a href={tryDemo} style={{textDecoration:"none"}}>Try Demo</a>
          <a href={learnMore} style={{marginLeft:"1rem", textDecoration:"none"}}>Learn More</a>
          </div>
          <div className='mt-2'>
            <a href={googlePlay}><img src='images/googlePlayBadge.svg'></img></a>
          <a href={appStore}><img src='images/appstoreBadge.svg'></img></a>
          </div>
          
        </div>
      </div>
    </div>
    </>
   );
}

export default LeftSection;