import axios from 'axios';

const BASE_URL = `http://api.giphy.com`;
const api_key = 'RmYeRMdgRGARKE7HfGZlmc6HcH5x1CJZ';

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
      let result = await this.request(`/v1/gifs/trending`, { api_key, limit: 8 });
      return result.data;
    } catch (error) {
      console.log('Error in fetching trending GIFS', error.response)
    }
  }

  static async fetchSearchedGifs(q){
    try {
      let result = await this.request(`/v1/gifs/search`, { api_key, q, limit: 8 });
      return result.data;
    } catch (error) {
      console.log('Error in fetching GIF by search query', error.response)
    }
  }

}

export default GiphyAPI;
