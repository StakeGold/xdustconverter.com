import React from 'react';
import ActionOrConnect from 'components/ActionOrConnect';

export interface ConvertButtonProps {
  handleSubmit: (event: React.MouseEvent) => void;
}

export const ConvertButton = ({ handleSubmit }: ConvertButtonProps) => {
  return (
    <ActionOrConnect>
      <button
        className='btn btn-primary btn-connect'
        onClick={(e) => handleSubmit(e)}
      >
        Convert small amounts
      </button>
    </ActionOrConnect>
  );
};
