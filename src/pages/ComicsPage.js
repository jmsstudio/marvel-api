import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';

//import LazyLoadHelper from '../components/LazyLoadHelper';
import LazyImage from '../components/LazyImage';
import ComicsState from '../stores/ComicsState';

/* eslint-disable no-undef */
@observer
class ComicsPage extends React.Component {
  constructor(props) {
    super(props);
    this.store = ComicsState;
    this.vn = null;
    this._handleScroll = this._handleScroll.bind(this);
  }

  componentWillMount() {
    this.store.loadComics();
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll(e) {
    e.preventDefault();
    const documentHeight = document.documentElement.offsetHeight;
    const windowHeight = window.innerHeight;
    const windowScroll = window.scrollY;
    const totalScroll = windowScroll + windowHeight;

    //when 20% near to bottom, loads more data
    if (totalScroll > documentHeight - documentHeight * 0.2 && !this.store.isLoading) {
      this.store.loadComics(true);
    }
  }

  render() {
    const defaultNoComicsMessage = <h4>No comics found for the selected character.</h4>;
    let hasData = true;
    const comics = toJS(this.store.comicsList);

    if (comics.length == 0 && !this.store.isLoading) {
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

    const loadingMessage = this.store.isLoading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw" /> : null;

    return (
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
                  {/*<LazyLoadHelper>*/}
                  <LazyImage src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="Comic thumbnail" />
                  {/*<img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="Comic thumbnail" />*/}
                  {/*</LazyLoadHelper>*/}
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
      </div>
    );
  }
}

export default ComicsPage;
