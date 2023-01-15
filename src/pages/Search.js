import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artist: '',
    loading: false,
    searchActive: false,
    searchedArtist: '',
    albums: [],
  };

  onSearch = (evt) => {
    evt.preventDefault();
    const { artist } = this.state;
    this.setState({ loading: true, artist: '' });
    searchAlbumsAPI(artist).then((data) => {
      const albumNames = [];
      data.forEach((album) => albumNames.push({
        name: album.collectionName,
        id: album.collectionId }));
      this.setState({
        loading: false,
        searchActive: true,
        searchedArtist: artist,
        albums: albumNames,
      });
    });
  };

  render() {
    const { artist, loading, searchActive, searchedArtist, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              value={ artist }
              onChange={ (evt) => this.setState({ artist: evt.target.value }) }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              onClick={ async (evt) => this.onSearch(evt) }
              disabled={ artist.length < 2 }
            >
              Pesquisar
            </button>
          </form>)}
        { searchActive ? (
          <p>
            Resultado de álbuns de:
            { ` ${searchedArtist}` }
          </p>) : null}
        {albums.length > 0 ? (
          albums.map((album, index) => (
            <div key={ index }>
              <p>{ album.name }</p>
              <Link
                data-testId={ `link-to-album-${album.id}` }
                to={ `/album/${album.id}` }
              >
                Teste
              </Link>
            </div>
          ))
        ) : <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
