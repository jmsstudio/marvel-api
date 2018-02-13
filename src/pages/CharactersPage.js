import React from 'react';
import { observer } from 'mobx-react';
import _debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';

/*import LazyImage from '../components/LazyImage';*/
import ComicsState from '../stores/ComicsState';

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
    return (
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
                  <img
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
      </div>
    );
  }
}

export default withRouter(CharactersPage);
