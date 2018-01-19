import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

import ComicsState from '../stores/ComicsState';

@observer
class ComicsPage extends React.Component {
  constructor(props) {
    super(props);
    this.store = ComicsState;
  }

  componentWillMount() {
    this.store.loadComics();
  }

  render() {
    const defaultNoComicsMessage = <h4>No comics found for the selected character.</h4>;
    let hasData = true;

    if (this.store.comicsList.length == 0 && !this.store.isLoading) {
      hasData = false;
    }

    let charImage = null;
    if (this.store.selectedCharacter.thumbnail) {
      charImage = (
        <img
          className="ma-tiny ma-pointer"
          src={`${this.store.selectedCharacter.thumbnail.path}.${this.store.selectedCharacter.thumbnail.extension}`}
          alt={this.store.selectedCharacter.description}
        />
      );
    }

    return (
      <div>
        <h2>Comics</h2>
        <hr />
        <h4>Character: {this.store.selectedCharacter.name}</h4>
        {charImage}

        <ul className="ma-card-container">
          {this.store.comicsList.map(comic => {
            const onsaleDate = moment(comic.dates.find(d => d.type == 'onsaleDate').date);

            return (
              <li key={comic.id} className="ma-card">
                <h5>{comic.title}</h5>
                <div className="ma-text-center">
                  <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="Comic thumbnail" />
                </div>
                <div>
                  Released date: <small>{onsaleDate.isValid() ? onsaleDate.format('DD/MM/YYYY') : '-'}</small>
                </div>
                <p>
                  <strong>Description:</strong> {comic.description || '-'}
                </p>
              </li>
            );
          })}
          {!hasData ? defaultNoComicsMessage : null}
        </ul>
      </div>
    );
  }
}

export default ComicsPage;
