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
  @observable isLoadingComics = false;
  @observable isLoadingCharacters = false;
  @observable
  characterPaginateConfig = {
    offset: 0,
    limit: 40,
    total: 999,
    count: 0,
  };
  @observable
  comicPaginateConfig = {
    offset: 0,
    limit: 40,
    total: 999,
    count: 0,
  };

  @action
  loadComics(append = false) {
    const DEFAULT_OFFSET = 20;
    this.isLoadingComics = true;

    let limit = this.comicPaginateConfig.limit;
    let offset = this.comicPaginateConfig.offset;
    let shouldLoad = true;

    if (append) {
      limit = this.comicPaginateConfig.limit;
      offset = this.comicPaginateConfig.count + this.comicPaginateConfig.offset + 1;

      if (offset < DEFAULT_OFFSET || this.comicPaginateConfig.count == 0) {
        shouldLoad = false;
        this.isLoadingComics = false;
      }
    }

    if (shouldLoad) {
      ComicsService.loadComics(this.selectedCharacter.id, limit, offset)
        .then(res => {
          runInAction('Loading comics', () => {
            this.isLoadingComics = false;
            if (append) {
              res.data.data.results.forEach(comic => this.comicsList.push(comic));
            } else {
              this.comicsList = res.data.data.results;
            }
            this.comicPaginateConfig = {
              offset: res.data.data.offset > 0 ? res.data.data.offset - 1 : 0,
              limit: res.data.data.limit,
              total: res.data.data.total,
              count: res.data.data.count,
            };
          });
        })
        .catch(err => {
          runInAction('Loading comics', () => {
            this.isLoadingComics = false;
          });
          console.error('An error ocurred when loading data: ', err);
        });
    }
  }

  @action
  loadCharacters(append = false) {
    const DEFAULT_OFFSET = 20;
    this.isLoadingCharacters = true;

    let limit = this.characterPaginateConfig.limit;
    let offset = this.characterPaginateConfig.offset;
    let shouldLoad = true;

    if (append) {
      limit = this.characterPaginateConfig.limit;
      offset = this.characterPaginateConfig.count + this.characterPaginateConfig.offset + 1;

      if (offset < DEFAULT_OFFSET || this.characterPaginateConfig.count == 0) {
        shouldLoad = false;
        this.isLoadingCharacters = false;
      }
    }

    if (shouldLoad) {
      ComicsService.loadCharacters(this.searchName, limit, offset)
        .then(res => {
          runInAction('Loading characters', () => {
            this.isLoadingCharacters = false;
            if (append) {
              res.data.data.results.forEach(char => this.charactersList.push(char));
            } else {
              this.charactersList = res.data.data.results;
            }
            this.characterPaginateConfig = {
              offset: res.data.data.offset > 0 ? res.data.data.offset - 1 : 0,
              limit: res.data.data.limit,
              total: res.data.data.total,
              count: res.data.data.count,
            };
          });
        })
        .catch(err => {
          runInAction('Loading characters', () => {
            this.isLoadingCharacters = false;
          });
          console.error('An error ocurred when loading data: ', err);
        });
    }
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
    this.characterPaginateConfig = {
      offset: 0,
      limit: 40,
      total: 999,
      count: 0,
    };
  }
}

export default new ComicsState();
