import React from 'react';
import logo from 'assets/img/xdustconverter.png';
import { Welcome } from 'components/Welcome';

export const ConvertLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-12 col-lg-9 col-xl-8 mx-auto text-center my-spacer'>
          <h1 className='page-title'>
            <span>xDustConverter</span>
            <img src={logo} />
          </h1>
          <h3 className='page-description font-weight-light text-secondary'>
            Convert small ESDT amounts to WEGLD
          </h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-12 col-lg-9 col-xl-8 mx-auto'>
          <Welcome />
          <div className='card'>{children}</div>
        </div>
      </div>
    </div>
  );
};
