import React from 'react';
import { useCheckVersion } from '@buidly/dapp-core/dist/hooks';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetDappConfig } from 'hooks/useGetDappConfig';

const UpdateNotification = () => {
  const { dappConfig } = useGetDappConfig();

  const [updateAvailable, refreshPage] = useCheckVersion({
    refreshRate: dappConfig?.updateRefreshRate ?? 60000
  });

  return updateAvailable ? (
    <div className='d-flex justify-content-between align-items-center px-3 py-3 px-md-4 bg-primary text-dark font-weight-bold'>
      A new version of the xDustConverter is available.
      <a
        href='/#'
        onClick={refreshPage}
        className='btn btn-secondary btn-reload'
      >
        <FontAwesomeIcon icon={faRefresh} />
      </a>
    </div>
  ) : (
    <></>
  );
};

export default UpdateNotification;
