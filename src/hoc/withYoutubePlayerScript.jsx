import React from 'react';

/**
 * HOC to handle loading youtube script
 * before display sub-component
 */
const withYoutubePlayerScript = () => WrappedComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line global-require
    const scriptjs = require('scriptjs');
    scriptjs('https://www.youtube.com/iframe_api', this.handleLoaded.bind(this));
  }

  handleLoaded() {
    console.log('looooaded');
    window.onYouTubeIframeAPIReady = () => {
      this.setState({
        loaded: true,
      });
    };
  }

  render() {
    const {
      loaded,
      youtubeHandler,
    } = this.state;
    if (!loaded) {
      return (
        <div>
          LOADING
        </div>
      );
    }
    return (
      <WrappedComponent
        {...this.props}
        youtubeHandler={youtubeHandler}
      />
    );
  }
};

export default withYoutubePlayerScript;
