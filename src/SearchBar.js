import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '' };
  }

  handleChange = evt => {
    this.setState({
      searchQuery: evt.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.getSearchResults(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="form-inline justify-content-center"
        >
          <div className="form-group m-1">
            <input
              className="form-control m-1"
              type="text"
              name="search"
              placeholder="Search for GIFS here!"
              onChange={this.handleChange}
            />
            <button
              type="submit"
              className="btn btn-secondary rounded m-1"
              name="searchButton"
            >
              Search Giphy!
            </button>
          </div>
          <button
            onClick={this.props.toggleFavoritesView}
            className="btn btn-primary rounded m-1"
          >
            View Favorites
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
