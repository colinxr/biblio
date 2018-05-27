import React, {Component} from 'react';
import PropTypes from 'prop-types';

class StatusBar extends Component {
  render() {
    const { errMsg, dismiss } = {...this.props};
    return(
      <div className="alert alert--error">
        <span>{errMsg}</span>
        <span className="clear" onClick={() => dismiss()}>X</span>
      </div>
    );
  }
}

StatusBar.propTypes = {
  errMsg: PropTypes.string.isRequired,
  dismiss: PropTypes.func.isRequired,
}

export default StatusBar;
