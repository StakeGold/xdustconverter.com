import React from 'react';
import ActionOrConnect from 'components/ActionOrConnect';

export interface ConvertButtonProps {
  handleSubmit: (event: React.MouseEvent) => void;
  disabled: boolean;
}

export const ConvertButton = ({
  handleSubmit,
  disabled
}: ConvertButtonProps) => {
  return (
    <ActionOrConnect>
      <button
        className='btn btn-primary btn-connect'
        onClick={(e) => handleSubmit(e)}
        disabled={disabled}
      >
        Convert small amounts
      </button>
    </ActionOrConnect>
  );
};
