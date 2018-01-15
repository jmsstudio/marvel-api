import React from 'react';
import { observer } from 'mobx-react';

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
  //id , title, thumbnail.path
  render() {
    return (
      <div>
        <h4>Comics</h4>
        <ul>
          {this.store.comicsList.map((comic, idx) => {
            return (
              <li key={comic.id}>
                <h5>{comic.title}</h5>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt="Comic thumbnail"
                  height="50px"
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ComicsPage;
