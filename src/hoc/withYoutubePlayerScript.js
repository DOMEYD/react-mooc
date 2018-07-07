import React from 'react';

const withYoutubePlayerScript = (options) => {
  return (WrappedComponent) => {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          loaded: false,
        };
      }
      handleLoaded() {
        console.log('looooaded');
        window.onYouTubeIframeAPIReady = () => {
          this.setState({
            loaded: true,
          });
        }
      }
      componentDidMount() {
        const scriptjs = require(`scriptjs`)
        scriptjs('https://www.youtube.com/iframe_api', this.handleLoaded.bind(this));
      }
      render() {
        if (!this.state.loaded) {
          return <div>LOADING</div>;
        }
        return (<WrappedComponent
          {...this.props}
          youtubeHandler={this.state.youtubeHandler}
        />);
      }
    };
  };
};

export default withYoutubePlayerScript;
