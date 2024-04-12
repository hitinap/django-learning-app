import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";

function withParamsAndHistory(Component) {
  return (props) => (
    <Component {...props} params={useParams()} history={useNavigate()} />
  );
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
    this.leaveButtonPressen = this.leaveButtonPressen.bind(this);
  }

  getItemDetails() {
    fetch("/api/item/get" + "?id=" + this.props.params.id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ text: data.text, done: data.done });
      });
  }

  leaveButtonPressen() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/item/leave", requestOptions).then((_response) => {
      this.props.history("/");
    });
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Item ID is #{this.state.id}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Text: {this.state.text}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            The item is done? {this.state.done.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={this.leaveButtonPressen}
          >
            Leave item page
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withParamsAndHistory(Item);
