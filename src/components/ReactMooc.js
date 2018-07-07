import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YoutubePlayerInput from './YoutubePlayerInput';

export default class ReactMooc extends Component {
  render() {
    return (<YoutubePlayerInput
      videoID={this.props.youtubeID}
      handleTimeSpreading={console.log}
    />);
  }
}

ReactMooc.propTypes = {
  youtubeID: PropTypes.string.isRequired,
};
