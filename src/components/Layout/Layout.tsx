import React from 'react';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='d-flex flex-column flex-fill wrapper'>
      <main className='d-flex flex-column flex-grow-1'>{children}</main>
      <Footer />
    </div>
  );
};
