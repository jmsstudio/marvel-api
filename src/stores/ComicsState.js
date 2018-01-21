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
  @observable
  paginateConfig = {
    offset: 0,
    limit: 20,
    total: 999,
    count: 0,
  };

  @action
  loadComics(append = false) {
    const DEFAULT_OFFSET = 20;
    this.isLoading = true;

    let limit = this.paginateConfig.limit;
    let offset = this.paginateConfig.offset;
    let shouldLoad = true;

    if (append) {
      limit = this.paginateConfig.limit;
      offset = this.paginateConfig.count + this.paginateConfig.offset + 1;

      if (offset < DEFAULT_OFFSET || this.paginateConfig.count == 0) {
        shouldLoad = false;
        this.isLoading = false;
      }
    }

    if (shouldLoad) {
      ComicsService.loadComics(this.selectedCharacter.id, limit, offset)
        .then(res => {
          runInAction('Loading comics', () => {
            this.isLoading = false;
            if (append) {
              res.data.data.results.forEach(comic => this.comicsList.push(comic));
            } else {
              this.comicsList = res.data.data.results;
            }
            this.paginateConfig = {
              offset: res.data.data.offset > 0 ? res.data.data.offset - 1 : 0,
              limit: res.data.data.limit,
              total: res.data.data.total,
              count: res.data.data.count,
            };
          });
        })
        .catch(err => console.error('An error ocurred when loading data: ', err));
    }
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
    this._resetPagination();
  }

  @action
  changeCharacterSearchName(characterName) {
    this.searchName = characterName;
  }

  @action
  _resetPagination() {
    this.paginateConfig = {
      offset: 0,
      limit: 20,
      total: 999,
      count: 0,
    };
  }
}

export default new ComicsState();
