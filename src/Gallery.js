import React, { Component } from 'react';
import GiphyAPI from './API/GiphyAPI';
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
      favoriteGifs: [],
      searchQuery: '',
      done: null,
      isLoading: false,
      error: false,
      favoriteView: false
    };
    // kind of buggy on scroll, doesn't work on certain window sizes
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

  // Once Gallery is mounted, we'll show some trending gifs
  async componentDidMount() {
    let trendingGifs = await GiphyAPI.fetchTrendingGifs();
    let localFavoriteGifs = JSON.parse(localStorage.getItem('favGifs'));
    this.setState({ trendingGifs, done: true, favoriteGifs: localFavoriteGifs });
  }

  // Syncs local storage with favorite GIFs
  componentDidUpdate(){
    localStorage.setItem('favGifs', JSON.stringify(this.state.favoriteGifs));
  }

  // Loads more GIFS needed for infinite scroll
  loadMoreGifs = async () => {
    const { searchQuery, trendingGifs, searchedGifs, moreGifs } = this.state;
    this.setState({ isLoading: true });
    // loads more GIFS based on user's search query if available
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
      // Else loads more trending GIFS
    } else {
      let offset = trendingGifs.length + moreGifs.length;
      let newTrendingGifs = await GiphyAPI.fetchTrendingGifs(offset);
      setTimeout(() => {
        this.setState({
          isLoading: false,
          moreGifs: [...moreGifs, ...newTrendingGifs]
        });
      }, 2000);
    }
  };

  // This will be passed down to our SearchBar, which sends the user's query to the Gallery
  getSearchResults = async searchQuery => {
    let searchedGifs = await GiphyAPI.fetchSearchedGifs(searchQuery);
    this.setState({ searchedGifs, searchQuery, moreGifs: [] });
  };

  // This will be passed down to GifDetails, which sends a newFavorite up to the Gallery
  addFavorite = async newFavoriteGif => {
    const { favoriteGifs } = this.state;
    this.setState({ favoriteGifs: [...favoriteGifs, newFavoriteGif] });
  };

  // This will be used to toggle to Favorite GIFS
  toggleFavoritesView = () => {
    this.setState(prevState => ({ favoriteView: !prevState.favoriteView }));
  };

  // Renders all favorite GIFS -- Testing will move this to a diff page using React Router
  renderFavoriteGifs = () => {
    return this.state.favoriteGifs.length > 0 ? (
      <div>
        {this.state.favoriteGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} addFavorite={this.addFavorite} />
        ))}
      </div>
    ) : (
      <h2> You have no favorites added :( </h2>
    );
  };

  // Renders 10 trending gifs to our app
  renderTrendingGifs = () => {
    return this.state.done ? (
      <div className="">
        {this.state.trendingGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} addFavorite={this.addFavorite} />
        ))}
      </div>
    ) : (
      <LoadingSpinner />
    );
  };

  // Renders 10 gifs based off search query
  renderSearchedGifs = () => {
    return (
      <div className="">
        {this.state.searchedGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} addFavorite={this.addFavorite} />
        ))}
      </div>
    );
  };

  // renders additional gifs upon scrolling down
  renderMoreGifs = () => {
    return (
      <div className="">
        {this.state.moreGifs.map(gif => (
          <GifDetails gif={gif} key={gif.id} addFavorite={this.addFavorite} />
        ))}
        {this.state.isLoading ? <LoadingSpinner /> : ''}
      </div>
    );
  };

  render() {
    const { searchQuery, searchedGifs } = this.state;
    return (
      <div className="container">
        <SearchBar
          getSearchResults={this.getSearchResults}
          toggleFavoritesView={this.toggleFavoritesView}
        />

        {this.state.favoriteView ? (
          <div>
            <h1> YOUR FAVORITE GIFS </h1>
            {this.renderFavoriteGifs()}
          </div>
        ) : (
          <div />
        )}

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
