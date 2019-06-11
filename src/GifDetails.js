import React, { Component } from 'react';

class GifDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { isHidden: false };
  }

  toggleHidden = () => {
    this.setState({ isHidden: !this.state.isHidden });
  };

  render() {
    let imgStyle = {
      margin: '10px',
      width: '200px',
      height: '200px'
    };
    let { gif } = this.props;

    return (
      <div className="wrapper" onClick={this.toggleHidden}>
        <img
          key={gif.id}
          src={gif.images.downsized.url}
          alt=""
          style={imgStyle}
        />
        {this.state.isHidden ? (
          <div className="details">
            <p> Title: {gif.title} </p>
            <p> Username: {gif.username ? gif.username : 'Anonymous'} </p>
            <p> Rating: {gif.rating.toUpperCase()} </p>
            <p> Source: {gif.source_tld} </p>
          </div>
        ) : (
          <div className="details"></div>
        )}
      </div>
    );
  }
}

export default GifDetails;
