import React from 'react';
import { Spinner } from 'react-bootstrap';
import ActionOrConnect from 'components/ActionOrConnect';

export interface ConvertButtonProps {
  handleSubmit: (event: React.MouseEvent) => void;
  disabled: boolean;
  loading: boolean;
}

export const ConvertButton = ({
  handleSubmit,
  disabled,
  loading
}: ConvertButtonProps) => {
  return (
    <ActionOrConnect>
      <button
        className='btn btn-primary btn-connect'
        onClick={(e) => handleSubmit(e)}
        disabled={disabled}
      >
        {loading ? (
          <Spinner as='span' animation='border' size='sm' />
        ) : (
          'Convert small amounts'
        )}
      </button>
    </ActionOrConnect>
  );
};
