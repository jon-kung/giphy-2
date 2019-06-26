import React, { Component } from 'react';
import LoadingSpinner from './LoadingSpinner';

class GifDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  // handleAddFavorite = gifObject => {
  //   this.props.addFavorite(gifObject)
  // }


  renderGif = () => {
    let { gif } = this.props;

    return this.state.isLoading ? (
      <LoadingSpinner />
    ) : (
      <div>
        <img
          className="image"
          key={gif.id}
          src={gif.images.downsized.url}
          alt=""
        />
        <div className="overlay">
          <div className="details">
            <p> Title: {gif.title} </p>
            <p> Username: {gif.username ? gif.username : 'Anonymous'} </p>
            <p> Rating: {gif.rating.toUpperCase()} </p>
            <p> Source: {gif.source_tld ? gif.source_tld : 'Unknown'} </p>
            {/* <i class="fas fa-heart" onClick={this.handleAddFavorite(gif)}></i> */}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="wrapper">
        {this.renderGif()}
      </div>
    );
  }
}

export default GifDetails;
