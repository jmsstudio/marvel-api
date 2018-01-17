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
    return (
      <div>
        <h2>Comics</h2>
        <hr />
        <ul className="ma-card-container">
          {this.store.comicsList.map((comic, idx) => {
            const onsaleDate = moment(
              comic.dates.find(d => d.type == 'onsaleDate').date
            );

            return (
              <li key={comic.id} className="ma-card">
                <h5>{comic.title}</h5>
                <div className="ma-text-center">
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt="Comic thumbnail"
                  />
                </div>
                <div>
                  Released date:{' '}
                  <small>
                    {onsaleDate.isValid()
                      ? onsaleDate.format('DD/MM/YYYY')
                      : '-'}
                  </small>
                </div>
                <p>
                  <strong>Description:</strong> {comic.description || '-'}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ComicsPage;
