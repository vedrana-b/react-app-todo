import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar,
  Col, FlexboxGrid
} from "rsuite";

class AddTask extends Component {

  state = {
    errorValue: false,
    errorPriority: false,
  }

  addTaskHandler = () => {
    let errorValue = !this.state.value;
    let errorPriority = !this.state.priority;

    this.setState({
      errorValue,
      errorPriority
    });

    if (errorValue || errorPriority) {
      return;
    };

    this.props.onAdd({
      priority: this.state.priority,
      value: this.state.value,
      id: this.generateId()
    });
  };

  generateId = () => {
    return new Date().getTime();
  };

  updateOnEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.addTaskHandler();
    }
  }

  updateInputValue = value => {
    this.setState({
      value: value
    });
  };

  updateInputPriority = priority => {
    this.setState({ priority: priority });
  };

  render() {
    return (
      <FlexboxGrid>
        <Form layout="horizontal" className="form">
          <FlexboxGrid.Item className="form-control" componentClass={Col} colspan={24} md={24}>
            <FormGroup className="form-group">
              <ControlLabel>Enter new task</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter task name"
                onChange={this.updateInputValue}
                onKeyUp={this.updateOnEnter}
                errorMessage={this.state.errorValue ? "Please enter task name" : null}
                errorPlacement={'bottomEnd'}
              ></FormControl>
            </FormGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="form-control" componentClass={Col} colspan={24} md={24} xs={24}>
            <FormGroup className="form-group">
              <ControlLabel>Priority</ControlLabel>
              <FormControl
                type="number"
                onChange={this.updateInputPriority}
                placeholder="Enter number"
                onKeyUp={this.updateOnEnter}
                errorMessage={this.state.errorPriority ? "Please enter task priority" : null}
                errorPlacement={'bottomEnd'}
              />
            </FormGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="form-control" componentClass={Col} colspan={24} md={24}>
            <FormGroup className="form-group form--button">
              <ButtonToolbar>
                <Button
                  id="add"
                  color="green"
                  className="form-group--add-btn"
                  onClick={this.addTaskHandler}
                >
                  Add Task
                  </Button>
              </ButtonToolbar>
            </FormGroup>
          </FlexboxGrid.Item>
        </Form>
      </FlexboxGrid>
    );
  }
}

export default AddTask;
