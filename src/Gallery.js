import React, { Component } from 'react';
import GiphyAPI from './GiphyAPI';
import GifDetails from './GifDetails';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingGifs: [],
      searchedGifs: [],
      moreGifs: [],
      done: null,
      isLoading: false,
      error: false
    };

    window.onscroll = () => {
      if (this.state.error || this.state.isLoading) return;
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        this.loadMoreGifs();
      }
    };
  }

  loadMoreGifs = async () => {
    this.setState({ isLoading: true });
    let offset = this.state.trendingGifs.length + this.state.moreGifs.length;
    let newGifs = await GiphyAPI.fetchMoreGifs(offset);
    setTimeout(() => {
      this.setState({
        isLoading: false,
        moreGifs: [...this.state.moreGifs, ...newGifs]
      });
    }, 2000);
  };

  async componentDidMount() {
    let trendingGifs = await GiphyAPI.fetchTrendingGifs();
    this.setState({ trendingGifs, done: true });
  }

  getSearchResults = async searchQuery => {
    let searchedGifs = await GiphyAPI.fetchSearchedGifs(searchQuery);
    this.setState({ ...this.state.searchedGifs, searchedGifs });
  };

  renderTrendingGifs = () => {
    return this.state.done ? (
      <div className="">
        {this.state.trendingGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} />
        ))}
      </div>
    ) : (
      <LoadingSpinner />
    );
  };

  renderSearchedGifs = () => {
    return this.state.searchedGifs.length > 0 ? (
      <div className="">
        {this.state.searchedGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} />
        ))}
      </div>
    ) : (
      <p> Try searching for more GIFS! </p>
    );
  };

  renderMoreGifs = () => {
    return (
      <div className="">
        {this.state.moreGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} />
        ))}
        {this.state.isLoading ? <LoadingSpinner /> : ''}
      </div>
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
        <h1> SCROLL FOR MOAR GIFS </h1>
        {this.renderMoreGifs()}
      </div>
    );
  }
}

export default Gallery;
