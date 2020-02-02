import React, { Component } from "react";
import { Header, Container, FlexboxGrid, Content, Footer, Col } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import "./Css/App.css";
import TaskList from "./components/taskList";
import AddTask from "./components/addTask";

class App extends Component {
  state = {
    tasklist: []
  };

  componentDidMount() {
    if (localStorage.getItem("tasklist") == null) {
      this.setState({ tasklist: [] });
      return;
    }
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    this.setState({ tasklist });
  }

  handleAdd = task => {
    if (isNaN(task.priority)) {
      return;
    }
    let tasklist = this.state.tasklist;
    tasklist.push(task);
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    tasklist.sort(function (a, b) {
      return a.priority - b.priority;
    });
    this.setState({ tasklist });
  };

  clearAll = () => {
    let tasklist = this.state.tasklist;
    tasklist.length = 0;
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    this.setState({ tasklist });
  };

  removeHandler = taskId => {
    let tasklist = this.state.tasklist;
    let taskIndex = tasklist.findIndex(task => task.id === taskId);
    tasklist.splice(taskIndex, 1);
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    this.setState({ tasklist });
  };



  render() {
    return (
      <div className="task-list">
        <Container>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item md={12} componentClass={Col} xs={24} className="container">
              <Header className="header">
                <h2> Christmas</h2> <h3>shopping list</h3>
              </Header>
              <Content className="content">
                <AddTask
                  onAdd={this.handleAdd}
                  tasklist={this.state.tasklist}
                />

                <TaskList
                  tasklist={this.state.tasklist}
                  onDelete={this.clearAll}
                  onRemoveTask={this.removeHandler}
                />
              </Content>
              <Footer></Footer>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Container>
      </div>
    );
  }
}

export default App;
