import React from 'react';

export const ConvertLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-9 col-lg-7 col-xl-6 mx-auto text-center my-spacer'>
          <h1 className='page-title'>xDustConverter</h1>
          <h3 className='page-description font-weight-light text-secondary'>
            Convert small ESDT amounts to WEGLD
          </h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-9 col-lg-7 col-xl-6 mx-auto'>
          <div className='card'>{children}</div>
        </div>
      </div>
    </div>
  );
};
