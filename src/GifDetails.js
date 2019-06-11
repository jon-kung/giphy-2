import React, { Component } from 'react';

class GifDetails extends Component {
  render() {
    let { gif } = this.props;

    return (
      <div className="wrapper">
        <img
          className="image"
          key={gif.id}
          src={gif.images.downsized.url}
          alt=""
        />
        <div className="overlay">
          <div className="details">
            <p> Title: {gif.title} </p>
            <p> Username: {gif.username ? gif.username : 'Anonymous'} </p>
            <p> Rating: {gif.rating.toUpperCase()} </p>
            <p> Source: {gif.source_tld ? gif.source_tld : 'Unknown'} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default GifDetails;
