import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    loading: false,
    isChecked: {},
    favoriteSongsIds: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((data) => {
      this.setState({ musics: data });
      data.forEach((music, index) => {
        if (index > 0) {
          this.setState((prevState) => {
            const isChecked = { ...prevState.isChecked };
            isChecked[music.trackId] = false;
            return { isChecked };
          });
        }
      });
    });

    getFavoriteSongs().then((data) => {
      const songs = [];
      data.forEach((music) => {
        songs.push(music.trackId);
        this.setState((prevState) => {
          const isChecked = { ...prevState.isChecked };
          isChecked[music.trackId] = true;
          return { isChecked };
        });
      });
      const { favoriteSongsIds } = this.state;
      this.setState({ favoriteSongsIds: [...favoriteSongsIds, ...songs] });
    });
  }

  updateLoading = (bool) => {
    this.setState({ loading: bool });
  };

  updateFavorites = (id) => {
    const { favoriteSongsIds } = this.state;
    this.setState({ favoriteSongsIds: [...favoriteSongsIds, id] });
  };

  updateCheck = (id) => {
    const { isChecked } = this.state;
    const newChecked = { ...isChecked };
    newChecked[id] = !newChecked[id];
    this.setState({ isChecked: newChecked });
  };

  render() {
    const { musics, loading, isChecked, favoriteSongsIds } = this.state;
    const musicRender = musics.map((music, index) => {
      if (index === 0) {
        return (
          <div key={ index }>
            <h2 data-testid="album-name">{ music.collectionName }</h2>
            <h4 data-testid="artist-name">{ music.artistName }</h4>
          </div>
        );
      }
      return (
        <MusicCard
          key={ index }
          updateLoading={ this.updateLoading }
          song={ music }
          songName={ music.trackName }
          preview={ music.previewUrl }
          isChecked={ isChecked[music.trackId] }
          updateCheck={ this.updateCheck }
          updateFavorites={ this.updateFavorites }
          trackId={ music.trackId }
          favoriteSongsIds={ favoriteSongsIds }
        />
      );
    });
    return (
      <div data-testid="page-album">
        <Header />
        { !loading ? musicRender : <Loading />}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
