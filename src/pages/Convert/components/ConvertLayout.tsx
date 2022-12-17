import React from 'react';

export const ConvertLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
