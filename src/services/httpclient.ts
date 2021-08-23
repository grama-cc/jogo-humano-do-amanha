import axios from 'axios';
class HttpClient {

  private configHeaders = {
    'Content-Type': 'application/json'
  };

  constructor(){
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    axios.defaults.headers = this.configHeaders;
  }
}

export default new HttpClient();


