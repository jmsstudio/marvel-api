import React from 'react';
import { observer } from 'mobx-react';

import ComicsState from '../stores/ComicsState';

@observer
class CharactersPage extends React.Component {
  constructor(props) {
    super(props);
    this.store = ComicsState;
  }

  componentWillMount() {
    this.store.loadCharacters();
  }

  render() {
    return (
      <div>
        <h2>Characters</h2>
        <hr />
        <div className="ma-grid">
          {this.store.charactersList.map((character, i) => {
            return (
              <div key={i}>
                {character.name}
                <div>
                  <img
                    className="ma-tiny"
                    src={`${character.thumbnail.path}.${
                      character.thumbnail.extension
                    }`}
                    alt={character.description}
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

export default CharactersPage;
