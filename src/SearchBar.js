import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <form action="/search" className="form-inline justify-content-center">
        <div className="form-group m-1">
          <input className="form-control m-1" type="text" name="search" />
          <button className="btn btn-secondary rounded m-1" name="searchButton">
            Search Giphy!
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
