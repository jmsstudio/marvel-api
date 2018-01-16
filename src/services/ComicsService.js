import axios from 'axios';
import md5 from 'crypto-js/md5';

import config from 'config';

const BASE_URL = config.marvelApi.baseUrl;
const API_PRIVATE_KEY = config.marvelApi.privateKey;
const API_PUBLIC_KEY = config.marvelApi.publicKey;

const ComicsService = {
  loadComics() {
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);

    return axios.get(
      `${BASE_URL}/comics?characters=1009368&orderBy=onsaleDate&ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`
    );
  }
};

export default ComicsService;
