import React from 'react';
import axios from 'axios';
import PageTabs from './PageTabs';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import TaskItem from './TaskItem';
import TaskList from './TaskList';
import AddTask from './AddTask';

const LARGE_DESKTOP_BREAKPOINT = 1366;
const SMALL_DESKTOP_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 768;

class App extends React.Component {
  state = {
    tasks: [],
    errorMessage: '',
    browserWidth: 0,
    view: 'page1'
  }

  componentDidMount() {
    this.getData();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  onViewChange(view) {
    this.setState({ view });
  }

  wrapPage(jsx) {
    const { view } = this.state;
    return (
      <div className="container">
        <PageTabs currentView={view}
                  onViewChange={this.onViewChange.bind(this)}/>
        {jsx}
      </div>
    );
  }

  getData() {
    axios.get('http://my-json-server.typicode.com/bnissen24/project2DB/posts')
      .then(response => {
        this.setState({ tasks: response.data });
      }).catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }

  onAddTask = (taskName) => {
    let tasks = this.state.tasks;
    tasks.push({
      title: taskName,
      id: this.state.tasks.length + 1,
      type: 'task',
      column: 'todo'
    });

    this.setState({ tasks });
  }

  handleResize = () => {
    const browserWidth = window.innerWidth;

    if (browserWidth < LARGE_DESKTOP_BREAKPOINT && browserWidth >= SMALL_DESKTOP_BREAKPOINT) {
    } else if (browserWidth < SMALL_DESKTOP_BREAKPOINT && browserWidth >= TABLET_BREAKPOINT) {
    } else if (browserWidth < TABLET_BREAKPOINT) {
    }

    this.setState({browserWidth });
  }

  onUpdateTaskList = (newTaskList) => {
    this.setState({ tasks: newTaskList });
  }

  render() {
    return (
      <div className="container">
        <AddTask onSubmit={this.onAddTask} />
        <TaskList tasks={this.state.tasks} onUpdateTaskList={this.onUpdateTaskList} />
      </div>
    );
    const { view } = this.state;

    switch (view) {
      case 'page1':
        return (this.wrapPage(
          <Page1 />
        ));
      case 'page2':
        return (this.wrapPage(
          <Page2 />
        ));
      case 'page3':
        return (this.wrapPage(
          <Page3 />
        ));
      default:
        return (this.wrapPage(
          <h2>Invalid Tab, choose another</h2>
        ));
  }
}
}

export default App;