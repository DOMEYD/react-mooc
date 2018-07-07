import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YoutubePlayerInput from './YoutubePlayerInput';

// eslint-disable-next-line react/prefer-stateless-function
export default class ReactMooc extends Component {
  render() {
    const {
      youtubeID,
    } = this.props;

    return (
      <YoutubePlayerInput
        videoID={youtubeID}
        handleTimeSpreading={console.log}
      />
    );
  }
}

ReactMooc.propTypes = {
  youtubeID: PropTypes.string.isRequired,
};
