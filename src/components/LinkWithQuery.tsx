import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const LinkWithQuery = ({ children, to, ...props }: any) => {
  const { search } = useLocation();

  return (
    <NavLink to={to + search} {...props}>
      {children}
    </NavLink>
  );
};
