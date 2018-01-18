import axios from 'axios';
import md5 from 'crypto-js/md5';

import config from 'config';

const BASE_URL = config.marvelApi.baseUrl;
const CHARACTERS_ENDPOINT = config.marvelApi.endpoints.characters;
const COMICS_ENDPOINT = config.marvelApi.endpoints.comics;

const API_PRIVATE_KEY = config.marvelApi.privateKey;
const API_PUBLIC_KEY = config.marvelApi.publicKey;

const ComicsService = {
  /**
   * Generates the url params relative to api validation token.
   */
  _generateAccessParams() {
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);

    return `ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;
  },

  /**
   * Loads a list of characters whose name starts with the <code>name</code> (optional)
   *
   * @param {string} name
   */
  loadCharacters(name = '') {
    const filterName = name ? `nameStartsWith=${name}` : '';

    return axios.get(
      `${BASE_URL}/${CHARACTERS_ENDPOINT}?${filterName}&orderBy=name&${this._generateAccessParams()}`
    );
  },

  /**
   * Load a list of comics for the character with the supplied id.
   *
   * @param {number} characterId
   */
  loadComics(characterId) {
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);

    return axios.get(
      `${BASE_URL}/${COMICS_ENDPOINT}?characters=${characterId}&orderBy=onsaleDate&${this._generateAccessParams()}`
    );
  }
};

export default ComicsService;
