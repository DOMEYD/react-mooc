import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YoutubePlayerInput from './YoutubePlayerInput';

export default class ReactMooc extends Component {
  render() {
    return (<YoutubePlayerInput
      handleTimeSpreading={console.log}
    />);
  }
}
