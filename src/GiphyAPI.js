import axios from 'axios';
import SECRET from './config';

const BASE_URL = `http://api.giphy.com`;
const api_key = SECRET;

class GiphyAPI {
  static async request(endpoint, paramsOrData = {}, verb = 'get') {
    console.debug('API Call:', endpoint, paramsOrData, verb);
    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}${endpoint}`,
        [verb === 'get' ? 'params' : 'data']: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error('API Error:', err.response);
      // let message = err.response.data.message;
      // throw Array.isArray(message) ? message : [message];
    }
  }

  static async fetchTrendingGifs() {
    try {
      let result = await this.request(`/v1/gifs/trending`, { api_key, limit: 10 });
      return result.data;
    } catch (error) {
      console.log('Error in fetching trending GIFS', error.response)
    }
  }

  static async fetchSearchedGifs(q){
    try {
      let result = await this.request(`/v1/gifs/search`, { api_key, q, limit: 10 });
      return result.data;
    } catch (error) {
      console.log('Error in fetching GIF by search query', error.response)
    }
  }


  //  Use this for infinite scroll, will need to offset by the current length of trendingGifs []
  static async fetchMoreGifs(offset){
    try {
      let result = await this.request(`/v1/gifs/trending`, { api_key, offset, limit: 10 });
      return result.data;
    } catch (error) {
      console.log('Error in fetching more GIFs', error.response)
    }
  }

}

export default GiphyAPI;
