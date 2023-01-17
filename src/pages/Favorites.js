import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    loading: true,
    songs: [],
    favoriteSongsIds: [],
  };

  componentDidMount() {
    getFavoriteSongs().then((data) => {
      this.setState({ songs: data, loading: false });
      const songs = [];
      data.forEach((music) => {
        songs.push(music.trackId);
      });
      const { favoriteSongsIds } = this.state;
      this.setState({ favoriteSongsIds: [...favoriteSongsIds, ...songs] });
    });
  }

  componentDidUpdate() {
    getFavoriteSongs().then((data) => {
      this.setState({ songs: data });
    });
  }

  updateLoading = (bool) => {
    this.setState({ loading: bool });
  };

  render() {
    const { loading, songs, favoriteSongsIds } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : (
          songs.map((song, index) => (
            <MusicCard
              key={ index }
              updateLoading={ this.updateLoading }
              song={ song }
              songName={ song.trackName }
              preview={ song.previewUrl }
              isChecked
              updateCheck={ () => null }
              updateFavorites={ null }
              trackId={ song.trackId }
              favoriteSongsIds={ favoriteSongsIds }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
