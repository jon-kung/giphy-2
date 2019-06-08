import React, { Component } from 'react';
 
  class Gallery extends Component {
    constructor(props) {
      super(props);
      this.state = { trendingGifs: [] };
      this.renderTrendingGifs = this.renderTrendingGifs.bind(this);
    }
  
    renderTrendingGifs() {
      return (
        <ul>
          {this.state.trendingGifs.map(gif => (
            <li key={gif.id}>
              {/* TODO: RENDER GIF HERE , LOOK AT JSON */}
            </li>
          ))}
        </ul>
      );
    }

    render() {
      return (
        <div className="container">
          <ul>
            {/* map over gifs that are passed here */}
            <li></li>
          </ul>
        </div>
      );
    }
  }
 
export default Gallery;