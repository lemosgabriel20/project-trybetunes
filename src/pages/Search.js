import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artist: '',
  };

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ (evt) => this.setState({ artist: evt.target.value }) }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            onClick={ (evt) => evt.preventDefault() }
            disabled={ artist.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
