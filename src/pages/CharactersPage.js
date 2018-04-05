import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import _debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';

import ComicsState from '../stores/ComicsState';
import LazyImage from '../components/LazyImage';
import Scrollable from '../components/Scrollable';

@observer
class CharactersPage extends React.Component {
  constructor(props) {
    super(props);
    this.store = ComicsState;

    this._handleChange = _debounce(this._handleChange, 350).bind(this);
    this._handleSelectCharacter = this._handleSelectCharacter.bind(this);
  }

  componentWillMount() {
    this.store.loadCharacters();
  }

  _handleChange() {
    this.store.loadCharacters();
  }

  _handleSelectCharacter(id) {
    this.store.selectCharacter(id);

    //navigate to comics section
    this.props.history.push('/comics');
  }

  render() {
    const percent = Math.round(this.store.charactersList.length / this.store.characterPaginateConfig.total * 100) / 100;
    const loadingMessage = this.store.isLoadingCharacters ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw" /> : null;

    const defaultNoCharactersMessage = <h4 className="ma-text-center">No characters found for the typed query.</h4>;
    let hasData = true;
    const chars = toJS(this.store.charactersList);

    if (chars.length == 0 && !this.store.isLoadingCharacters) {
      hasData = false;
    }

    return (
      <Scrollable check={!this.store.isLoadingCharacters} callback={() => this.store.loadCharacters(true)}>
        <div>
          <h2>Characters</h2>
          <hr />
          <div className="ma-mv--5 ma-mb--10 ma-mh--5">
            <label htmlFor="characterName">Filter characters</label>
            <input
              type="text"
              className="ma-full"
              id="characterName"
              placeholder="Type to filter characters"
              value={this.store.searchName}
              onChange={e => {
                this.store.changeCharacterSearchName(e.target.value);
                this._handleChange();
              }}
            />
          </div>
          <div className="ma-grid ma-mt--20">
            {this.store.charactersList.map((character, i) => {
              return (
                <div key={i}>
                  <span className="ma-pointer" onClick={() => this._handleSelectCharacter(character.id)}>
                    {character.name}
                  </span>
                  <div>
                    <LazyImage
                      className="ma-tiny ma-pointer"
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.description}
                      onClick={() => this._handleSelectCharacter(character.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {!hasData ? defaultNoCharactersMessage : null}
          <div className="ma-text-center">{loadingMessage}</div>
          <footer className="ma-app-footer">
            Loaded {this.store.charactersList.length} from {this.store.characterPaginateConfig.total} ({percent}%)
          </footer>
        </div>
      </Scrollable>
    );
  }
}

export default withRouter(CharactersPage);
