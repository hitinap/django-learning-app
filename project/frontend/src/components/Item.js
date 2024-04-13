import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateItemPage from "./CreateItemPage";

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
      isHost: true,
      showSettings: false,
    };
    this.leaveButtonPressen = this.leaveButtonPressen.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getItemDetails = this.getItemDetails.bind(this);
    this.getItemDetails();
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

  updateShowSettings(value) {
    this.setState({ showSettings: value });
  }

  renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateItemPage
            update={true}
            text={this.state.text}
            done={this.state.done}
            id={this.state.id}
            updateCallback={this.getItemDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }
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
        {this.state.isHost ? this.renderSettingsButton() : null}
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
