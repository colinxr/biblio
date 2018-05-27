import React from 'react';

import './Header.css';

const Header = (props) => {
  return (
    <header>
      <h1 className="header__name">{props.name}</h1>
    </header>
  );
}

export default Header;
