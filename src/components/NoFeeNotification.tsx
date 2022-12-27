import React from 'react';

const NoFeeNotification = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center px-3 py-3 px-md-4 bg-primary text-dark font-weight-bold text-center'>
      <div>🎉 Happy New Year! 🎉</div>
      <div>
        <del className='text-secondary'>5%</del> 0% protocol fees until end of
        year
      </div>
    </div>
  );
};

export default NoFeeNotification;
