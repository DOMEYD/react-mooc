import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withYoutubePlayer from '../hoc/withYoutubePlayer';

@withYoutubePlayer({})
export default class ReactMooc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      interval: null,
    };
  }
  onPlayerStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.PLAYING:
        const interval = setInterval(() => {
          console.log(this.state.player, this.state.player.getCurrentTime(), this.state.player.getDuration())
        }, 500);
        this.setState({
          interval,
        });
        break;
      case YT.PlayerState.PAUSED:
        clearInterval(this.state.interval);
        break;
    }
  }
  stopVideo() {
    player.stopVideo();
  }
  handleRef(node) {
    if (!window.YT || node === null || this.state.player) {
      console.error('yt not loaded');
      return;
    }
    const player = new window.YT.Player(node, {
      height: '120',
      width: '320',
      videoId: 'M7lc1UVf-VE',
      events: {
        // 'onReady': onPlayerReady,
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
    this.setState({
      player,
    });
  }
  render() {
    return (
      <div ref={this.handleRef.bind(this)} />
    )
  }
}
