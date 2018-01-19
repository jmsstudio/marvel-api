import { useStrict, observable, action, runInAction } from 'mobx';

import ComicsService from '../services/ComicsService';

useStrict(true);

/* eslint-disable no-undef */
class ComicsState {
  @observable searchName = '';
  @observable
  selectedCharacter = {
    id: 1009368,
    name: 'Iron Man',
  };
  @observable charactersList = [];
  @observable comicsList = [];
  @observable isLoading = false;

  @action
  loadComics() {
    this.isLoading = true;
    ComicsService.loadComics(this.selectedCharacter.id)
      .then(res => {
        runInAction('Loading comics', () => {
          this.isLoading = false;
          this.comicsList = res.data.data.results;
        });
      })
      .catch(err => console.error('An error ocurred when loading data: ', err));
  }

  @action
  loadCharacters() {
    ComicsService.loadCharacters(this.searchName)
      .then(res => {
        runInAction('Loading characters', () => {
          this.charactersList = res.data.data.results;
        });
      })
      .catch(err => console.error('An error ocurred when loading data: ', err));
  }

  @action
  selectCharacter(characterId) {
    this.selectedCharacter = this.charactersList.find(c => c.id == characterId);
  }

  @action
  changeCharacterSearchName(characterName) {
    this.searchName = characterName;
  }
}

export default new ComicsState();
