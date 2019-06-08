import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <form action="/search" class="form-inline justify-content-center">
        <div class="form-group m-1">
          <input class="form-control m-1" type="text" name="search" />
          <button class="btn btn-secondary rounded m-1" name="searchButton">
            Search Giphy!
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
