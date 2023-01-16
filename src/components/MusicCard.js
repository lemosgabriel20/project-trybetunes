import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  addFavoriteSong = (song) => {
    const { updateLoading, favoriteSongsIds, updateFavorites } = this.props;
    updateLoading(true);
    if (!(favoriteSongsIds.includes(song.trackId))) {
      addSong(song).then(() => {
        updateLoading(false);
        updateFavorites(song.trackId);
      });
    } else {
      removeSong(song).then(() => {
        updateLoading(false);
      });
    }
  };

  render() {
    const { songName, preview, trackId, song, isChecked, updateCheck } = this.props;
    return (
      <div>
        <p>{ songName }</p>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            checked={ isChecked }
            onChange={ () => {
              updateCheck(trackId);
              this.addFavoriteSong(song);
            } }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  songName: PropTypes.string,
  preview: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;
