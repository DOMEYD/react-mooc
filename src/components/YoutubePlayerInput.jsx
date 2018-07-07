import React from 'react';
import withYoutubePlayerScript from '../hoc/withYoutubePlayerScript';

@withYoutubePlayerScript({})
export default class YoutubePlayerInput extends React.Component {
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
          this.props.handleTimeSpreading({
            currentTime: this.state.player.getCurrentTime(),
            totalTime: this.state.player.getDuration(),
          });
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
      videoId: this.props.videoID,
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
