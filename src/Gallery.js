import React, { Component } from 'react';
import GiphyAPI from './GiphyAPI';
import GifDetails from './GifDetails';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { trendingGifs: [] };
  }

  async componentDidMount() {
    let trendingGifs = await GiphyAPI.fetchTrendingGifs();
    this.setState({ trendingGifs });
  }

  renderTrendingGifs = () => {
    return this.state.trendingGifs ? (
      <div className="container">
        {this.state.trendingGifs.map(gif => (
          <GifDetails
            gif={gif}
            key={gif.id}
          />
        ))}
      </div>
    ) : (
      <div>
        {' '}
        Oops! Trending GIFS should be here :( , please try again in 15 minutes.{' '}
      </div>
    );
  };

  render() {
    return <div>{this.renderTrendingGifs()}</div>;
  }
}

export default Gallery;
