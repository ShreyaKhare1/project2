import React from 'react';
function RightSection({imageUrl, productName, productDescription, linkContent, link} ) {
  return (
    <>
    <div className='container '>
      <div className='row'>
        <div className='col-6 pt-5 px-5' style={{marginTop:"2rem"}}>
          <h1 className='fs-2 mt-5 text-muted'>{productName}</h1>
          <p className='text-muted'>{productDescription}</p>
          <a href={link} style={{textDecoration:"none"}}>{linkContent}</a>
        </div>
        <div className='col-6'>
          <img src={imageUrl}></img>
        </div>
      </div>
    </div>
    </>
   );
}

export default RightSection;