import { useStrict, observable, action, runInAction } from 'mobx';

import ComicsService from '../services/ComicsService';

class ComicsState {
  @observable comicsList = [];

  @action
  loadComics() {
    ComicsService.loadComics()
      .then(res => {
        runInAction('Loading data', () => {
          this.comicsList = res.data.data.results;
        });
      })
      .catch(err => console.error('An error ocurred when loading data'));
  }
}

export default new ComicsState();
