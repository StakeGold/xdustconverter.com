import React from 'react';
import { useCheckVersion } from '@buidly/dapp-core/dist/hooks';
import { UPDATE_REFRESH_RATE } from 'config';

const UpdateNotification = () => {
  const [updateAvailable, refreshPage] = useCheckVersion({
    refreshRate: UPDATE_REFRESH_RATE
  });

  return updateAvailable ? (
    <div className='d-flex justify-content-between align-items-center px-3 py-3 px-md-4 bg-primary text-dark font-weight-bold'>
      A new version of the Dapp is available.
      <a
        href='/#'
        onClick={refreshPage}
        className='ml-1 text-black font-weight-bold'
      >
        <span className=' text-dark'>Reload</span>
      </a>
    </div>
  ) : (
    <></>
  );
};

export default UpdateNotification;
