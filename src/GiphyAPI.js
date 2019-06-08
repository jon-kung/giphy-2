import axios from 'axios';

const BASE_URL = `api.giphy.com`;

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
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async fetchTrendingGifs() {
    let result = await this.request(`${BASE_URL}/v1/gifs/trending`);
    console.log(`testing fetchTrending, ${result}`);
    return result.data;
  }

}

export default GiphyAPI;
