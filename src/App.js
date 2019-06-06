import React from 'react';

function App() {
  return (
    <div className="App">
      <form action="#" class="form-inline justify-content-center">
        <div class="form-group m-1">
          <input class="form-control m-1" type="text" name="search" />
          <button class="btn btn-secondary rounded m-1" name="searchButton">
            Search Giphy!
          </button>
          <button class="btn m-1 btn-danger rounded" name="removeButton">
            Remove Images
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
