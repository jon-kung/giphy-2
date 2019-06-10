import React, { Component } from 'react';
import GiphyAPI from './GiphyAPI';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { trendingGifs: [] };
    this.renderTrendingGifs = this.renderTrendingGifs.bind(this);
  }

  async componentDidMount() {
    let trendingGifs = await GiphyAPI.fetchTrendingGifs();
    this.setState({ trendingGifs });
  }

  renderTrendingGifs() {
    let imgStyle = {
      margin: '10px',
      width: '200px',
      height: '200px'
    }

    return (
      this.state.trendingGifs ?
      ( <div className="container">
        {this.state.trendingGifs.map(gif => (
          <img key={gif.id} src={gif.images.downsized.url} alt="" style={imgStyle}/>
        ))}
      </div> ) :
      <div> Error, please try again in 15 minutes :( </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderTrendingGifs()}
      </div>
    );
  }
}

export default Gallery;
