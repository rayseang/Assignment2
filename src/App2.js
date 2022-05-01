import React from 'react';

const LARGE_DESKTOP_BREAKPOINT = 1366;
const SMALL_DESKTOP_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 768;

class App extends React.Component {

  state = {
    browserWidth: 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  handleResize = () => {
    const browserWidth = window.innerWidth;

    if (browserWidth < LARGE_DESKTOP_BREAKPOINT && browserWidth >= SMALL_DESKTOP_BREAKPOINT) {
    } else if (browserWidth < SMALL_DESKTOP_BREAKPOINT && browserWidth >= TABLET_BREAKPOINT) {
    } else if (browserWidth < TABLET_BREAKPOINT) {
    }

    this.setState({browserWidth });
  }

  render() {
    return (
      <div className={ `container ${this.state.breakpoint}` }>
      </div>
    )
  }
}



export default App;