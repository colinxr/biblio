import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

const Header = (props) => {
  return (
    <header>
      <h1 className="header__name">{props.name}</h1>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Header;
