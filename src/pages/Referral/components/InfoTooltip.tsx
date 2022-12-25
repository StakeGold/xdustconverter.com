import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactComponent as InfoIcon } from 'assets/img/info.svg';

export const InfoTooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <OverlayTrigger
      placement='top'
      overlay={(props) => <Tooltip {...props}>{children}</Tooltip>}
    >
      <InfoIcon style={{ width: '1.25rem', height: '1.25rem' }} />
    </OverlayTrigger>
  );
};
