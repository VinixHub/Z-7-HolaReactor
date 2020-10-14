import React from 'react';

const Header = ({ title }) => {
  return (
    <nav className="justify-content-center navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/#">{title}</a>
    </nav>
  );
};

export default Header;