import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';

import LazyImage from '../components/LazyImage';
import ComicsState from '../stores/ComicsState';
import Scrollable from '../components/Scrollable';

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
    const percent = Math.round(this.store.comicsList.length / this.store.comicPaginateConfig.total * 100) / 100;
    const defaultNoComicsMessage = <h4>No comics found for the selected character.</h4>;
    let hasData = true;
    const comics = toJS(this.store.comicsList);

    if (comics.length == 0 && !this.store.isLoadingComics) {
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

    const loadingMessage = this.store.isLoadingComics ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw" /> : null;

    return (
      <Scrollable check={!this.store.isLoadingComics} callback={() => this.store.loadComics(true)}>
        <div>
          <h2>Comics</h2>
          <hr />
          <h4>Character: {this.store.selectedCharacter.name}</h4>
          {charImage}

          <ul className="ma-card-container">
            {comics.map(comic => {
              const onsaleDate = moment(comic.dates.find(d => d.type == 'onsaleDate').date);

              return (
                <li key={comic.id} className="ma-card">
                  <h5>{comic.title}</h5>
                  <div className="ma-text-center">
                    <LazyImage src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="Comic thumbnail" />
                  </div>
                  <div>
                    Released date: <small>{onsaleDate.isValid() ? onsaleDate.format('DD/MM/YYYY') : '-'}</small>
                  </div>
                  <p className="container">
                    <strong>Description:</strong> <span>{comic.description || '-'}</span>
                  </p>
                </li>
              );
            })}
            {!hasData ? defaultNoComicsMessage : null}
          </ul>
          <div className="ma-text-center">{loadingMessage}</div>
          <footer className="ma-app-footer">
            Loaded {this.store.comicsList.length} from {this.store.comicPaginateConfig.total} ({percent || 0}%)
          </footer>
        </div>
      </Scrollable>
    );
  }
}

export default ComicsPage;
