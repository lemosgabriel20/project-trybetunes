import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    musics: [],
    loading: false,
    isChecked: {},
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
  }

  updateLoading = (bool) => {
    this.setState({ loading: bool });
  };

  updateCheck = (id) => {
    const { isChecked } = this.state;
    const newChecked = { ...isChecked };
    newChecked[id] = !newChecked[id];
    this.setState({ isChecked: newChecked });
  };

  render() {
    const { musics, loading, isChecked } = this.state;
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
          trackId={ music.trackId }
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
