import React from 'react';

function MainPage() {
  return (
    <div>
      <h2>Marvel API Data</h2>
      <hr />
      <p>
        This project was created by <em>Jefferson Mariano de Souza</em> as a way to learn a little more about javascript
        and react framework.
      </p>
      <p>
        It serves as a front-end project using data provided from the{' '}
        <a href="http://developer.marvel.com" target="_blank" rel="noopener noreferrer">
          Marvel Api
        </a>
      </p>
      <p>The main technologies used in this project were react, mobx and sass.</p>
      <p>If you want to contact me, here are my contacts:</p>
      <ul>
        <li>
          <a href="https://github.com/jmsstudio" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-fw fa-2x fa-github" /> /jmsstudio
          </a>
        </li>
        <li>
          <a href="mailto:jefferson.msouza86@gmail.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-fw fa-2x fa-envelope-o" /> jefferson.msouza86@gmail.com
          </a>
        </li>
      </ul>
      <p>
        If you want to contribute,{' '}
        <a href="https://github.com/jmsstudio/marvel-api" title="MarvelAPI">
          this
        </a>{' '}
        is the project repository:
      </p>
      <a href="https://github.com/jmsstudio/marvel-api" title="Fork me on github">
        <i className="fa fa-fw fa-2x fa-code-fork" /> Fork me on <i className="fa fa-fw fa-lg fa-github-alt" />
      </a>
    </div>
  );
}

export default MainPage;
