import React from 'react';
import PropTypes from 'prop-types';
import withYoutubePlayerScript from '../hoc/withYoutubePlayerScript';

@withYoutubePlayerScript
export default class YoutubePlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      interval: null,
    };
  }

  onPlayerStateChange(event) {
    const {
      handleTimeSpreading,
    } = this.props;
    const {
      player,
      interval,
    } = this.state;
    switch (event.data) {
      case window.YT.PlayerState.PLAYING:
        const intervalID = setInterval(() => {
          handleTimeSpreading({
            currentTime: player.getCurrentTime(),
            totalTime: player.getDuration(),
          });
        }, 500);
        this.setState({
          interval: intervalID,
        });
        break;
      case window.YT.PlayerState.PAUSED:
        clearInterval(interval);
        break;
      default: break;
    }
  }

  handleRef(node) {
    const {
      player,
    } = this.state;
    const {
      videoID,
    } = this.props;
    if (!window.YT || node === null || player) {
      console.error('yt not loaded');
      return;
    }
    const playerHandler = new window.YT.Player(node, {
      height: '120',
      width: '320',
      videoId: videoID,
      events: {
        // 'onReady': onPlayerReady,
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
    this.setState({
      player: playerHandler,
    });
  }

  render() {
    return (
      <div ref={this.handleRef.bind(this)} />
    );
  }
}

YoutubePlayerInput.propTypes = {
  handleTimeSpreading: PropTypes.func.isRequired,
  videoID: PropTypes.string.isRequired,
};
