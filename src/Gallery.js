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
      searchQuery: '',
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
    const { searchQuery, trendingGifs, searchedGifs, moreGifs } = this.state;
    this.setState({ isLoading: true });

    if (searchQuery) {
      let offset = searchedGifs.length + moreGifs.length;
      let newSearchedGifs = await GiphyAPI.fetchSearchedGifs(
        searchQuery,
        offset
      );
      setTimeout(() => {
        this.setState({
          isLoading: false,
          moreGifs: [...moreGifs, ...newSearchedGifs]
        });
      }, 2000);
    } else {
      let offset = trendingGifs.length + moreGifs.length;
      let newGifs = await GiphyAPI.fetchTrendingGifs(offset);
      setTimeout(() => {
        this.setState({
          isLoading: false,
          moreGifs: [...moreGifs, ...newGifs]
        });
      }, 2000);
    }
  };

  async componentDidMount() {
    let trendingGifs = await GiphyAPI.fetchTrendingGifs();
    this.setState({ trendingGifs, done: true });
  }

  getSearchResults = async searchQuery => {
    let searchedGifs = await GiphyAPI.fetchSearchedGifs(searchQuery);
    this.setState({ searchedGifs, searchQuery, moreGifs: [] });
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
    return (
      <div className="">
        {this.state.searchedGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} />
        ))}
      </div>
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
    const {searchQuery, searchedGifs} = this.state;
    return (
      <div className="container">
        <SearchBar getSearchResults={this.getSearchResults} />
        {searchedGifs.length > 0 ? (
          <div>
            {<h1> GIFS of {searchQuery.toUpperCase()}</h1>}
            {this.renderSearchedGifs()}
            <h1> SCROLL FOR MOAR {searchQuery.toUpperCase()} GIFS </h1>
            {this.renderMoreGifs()}
          </div>
        ) : (
          <div>
            <h1> TRENDING GIFS </h1>
            {this.renderTrendingGifs()}
            <h1> SCROLL FOR MOAR TRENDING GIFS </h1>
            {this.renderMoreGifs()}
          </div>
        )}
      </div>
    );
  }
}

export default Gallery;
