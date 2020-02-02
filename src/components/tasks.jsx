import React, { Component } from "react";
import { Button } from "rsuite";

class Task extends Component {
  render() {
    return (
      <div className="task">
        <span> {this.props.task.priority}</span>
        <span>{this.props.task.value}</span>

        <Button onClick={() => this.props.onRemoveTask(this.props.id)}>
          x
        </Button>
      </div>
    );
  }
}

export default Task;
