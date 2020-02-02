import React, { Component } from "react";
import {
  List,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar,
  FlexboxGrid, Col
} from "rsuite";
import Task from "./tasks";

class TaskList extends Component {
  state = { value: "" };

  onFilterValueChange = filteredValue => {
    return this.setState({
      value: filteredValue
    });
  };

  filterValues = task => {
    return (
      task.value.toLowerCase().includes(this.state.value.toLowerCase()) ||
      task.priority == this.state.value
    );
  };

  render() {
    return (
      <FlexboxGrid >
        <Form fluid layout="horizontal" className="form">
          <FlexboxGrid.Item className="form-control" componentClass={Col} colspan={24} md={24}>
            <FormGroup className="form-group">
              <ControlLabel>Filter list</ControlLabel>
              <FormControl type="text" onChange={this.onFilterValueChange} />
            </FormGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item componentClass={Col} colspan={24} md={24}>
            <List className="printed-list">
              {this.props.tasklist
                .filter(this.filterValues)
                .map((task, index) => (
                  <Task
                    onRemoveTask={this.props.onRemoveTask}
                    key={index}
                    id={task.id}
                    task={task}
                  />
                ))}
            </List>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="form-control" componentClass={Col} colspan={24} md={24}>
            <FormGroup className="form-group form-group--clear-btn">
              <ButtonToolbar>
                <Button onClick={this.props.onDelete} appearance="default">
                  Clear All
              </Button>
              </ButtonToolbar>
            </FormGroup>{" "}
          </FlexboxGrid.Item>
        </Form>
      </FlexboxGrid>
    );
  }
}
export default TaskList;
