import { useStrict, observable, action, runInAction } from 'mobx';

import ComicsService from '../services/ComicsService';

class ComicsState {
  @observable selectedCharacter = '1009368'; //iron man
  @observable charactersList = [];
  @observable comicsList = [];

  @action
  loadComics() {
    ComicsService.loadComics(this.selectedCharacter)
      .then(res => {
        runInAction('Loading comics', () => {
          this.comicsList = res.data.data.results;
        });
      })
      .catch(err => console.error('An error ocurred when loading data'));
  }

  @action
  loadCharacters() {
    ComicsService.loadCharacters()
      .then(res => {
        runInAction('Loading characters', () => {
          this.charactersList = res.data.data.results;
        });
      })
      .catch(err => console.error('An error ocurred when loading data'));
  }

  @action
  selectCharacter(characterId) {
    this.selectedCharacter = characterId;
  }
}

export default new ComicsState();
