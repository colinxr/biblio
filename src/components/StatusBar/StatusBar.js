import React, {Component} from 'react';
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

export default StatusBar;
