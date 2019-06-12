import React, { Component } from 'react';
import GiphyAPI from './GiphyAPI';
import GifDetails from './GifDetails';
import SearchBar from './SearchBar';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { trendingGifs: [], searchedGifs: [] };
  }

  async componentDidMount() {
    let trendingGifs = await GiphyAPI.fetchTrendingGifs();
    this.setState({ trendingGifs });
  }

  getSearchResults = async searchQuery => {
    let searchedGifs = await GiphyAPI.fetchSearchedGifs(searchQuery);
    this.setState({ searchedGifs });
  };

  renderTrendingGifs = () => {
    return this.state.trendingGifs ? (
      <div className="">
        {this.state.trendingGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} />
        ))}
      </div>
    ) : (
      <div>
        {' '}
        Oops! Trending GIFS should be here :( , please try again in 15 minutes.{' '}
      </div>
    );
  };

  renderSearchedGifs = () => {
    return this.state.searchedGifs ? (
      <div className="">
        {this.state.searchedGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} />
        ))}
      </div>
    ) : (
      <div> Try searching for more GIFS! </div>
    );
  };

  render() {
    return (
      <div className="container">
        <SearchBar getSearchResults={this.getSearchResults} />
        <h1> TRENDING GIFS </h1>
        {this.renderTrendingGifs()}
        <h1> SEARCHED GIFS </h1>
        {this.renderSearchedGifs()}
      </div>
    );
  }
}

export default Gallery;
