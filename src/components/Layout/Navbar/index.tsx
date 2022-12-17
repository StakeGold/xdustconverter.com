import React from 'react';
import { useGetIsLoggedIn } from '@elrondnetwork/dapp-core/hooks';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';

export const Navbar = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(window.location.origin);
  };

  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <Nav className='ml-auto'>
          {isLoggedIn && (
            <>
              <NavItem>
                <button className='btn btn-link' onClick={handleLogout}>
                  Close
                </button>
              </NavItem>
            </>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};
