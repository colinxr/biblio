import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './StatusBar.css';

class StatusBar extends Component {
  render() {
    const { errMsg, dismiss } = {...this.props};
    return(
      <div className="alert alert-error">
        <p>{errMsg}</p>
        <span className="clear" onClick={() => dismiss()}>X</span>
      </div>
    );
  }
}

StatusBar.propTypes = {
  errMsg: PropTypes.string.isRequired,
  dissmiss: PropTypes.func.isRequired,
}

export default StatusBar;
