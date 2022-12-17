import React from 'react';

export const ConvertLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-10 col-lg-8 col-xl-7 mx-auto text-center my-spacer'>
          <h1 className='page-title'>xDustConverter</h1>
          <h3 className='page-description font-weight-light text-secondary'>
            Convert small ESDT amounts to WEGLD
          </h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-10 col-lg-8 col-xl-7 mx-auto'>
          <div className='card'>{children}</div>
        </div>
      </div>
    </div>
  );
};
