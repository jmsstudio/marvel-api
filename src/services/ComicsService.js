import axios from 'axios';
import md5 from 'crypto-js/md5';

import config from 'config';

const API_PRIVATE_KEY = config.marvelApi.privateKey;
const API_PUBLIC_KEY = config.marvelApi.publicKey;

const ComicsService = {
  loadComics() {
    const timestamp = new Date().getTime();
    const strtohash = timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY;
    const hash = md5(strtohash);

    return axios.get(
      `http://gateway.marvel.com/v1/public/comics?characters=1009368&orderBy=focDate&ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`
    );
  }
};

export default ComicsService;
