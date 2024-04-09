import React, { Component } from "react";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      text: "Текст задачи",
      done: false,
    };
    this.getItemDetails();
  }

  getItemDetails() {
    fetch("/api/item/get" + "?id=" + this.props.params.id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ text: data.text, done: data.done });
      });
  }

  render() {
    return (
      <div>
        <h3>#{this.state.id}</h3>
        <p>Text: {this.state.text}</p>
        <p>Done? {this.state.done.toString()}</p>
      </div>
    );
  }
}

export default withParams(Item);
