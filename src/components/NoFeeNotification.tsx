import React from 'react';

const NoFeeNotification = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center px-3 py-3 px-md-4 bg-primary text-dark font-weight-bold text-center'>
      <div>☃️ CHRISTMAS EDITION ☃️</div>
      <div>
        <del className='text-secondary'>5%</del> 0% fees until 26.12.2022
      </div>
    </div>
  );
};

export default NoFeeNotification;
