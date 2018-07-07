import React from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * HOC to handle loading youtube script
 * before display sub-component
 */
function withYoutubePlayerScript(WrappedComponent) {
  class WithYoutubePlayerScript extends React.Component {
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
  }
  WithYoutubePlayerScript.displayName = `WithYoutubePlayerScript(${getDisplayName(WrappedComponent)})`;
  return WithYoutubePlayerScript;
}

export default withYoutubePlayerScript;
