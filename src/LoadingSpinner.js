import React, { Component } from 'react';

class LoadingSpinner extends Component {
  render() {
    return (
        <div className="d-flex justify-content-center">
          <i className="fas fa-spinner fa-3x" />
        </div>
    );
  }
}

export default LoadingSpinner;
