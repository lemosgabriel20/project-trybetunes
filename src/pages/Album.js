import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musics: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((data) => {
      this.setState({ musics: data });
      console.log(data);
    });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { musics.map((music, index) => {
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
              songName={ music.trackName }
              preview={ music.previewUrl }
            />
          );
        })}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
