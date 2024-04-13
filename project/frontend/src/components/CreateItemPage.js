import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function withHistory(Component) {
  return (props) => <Component {...props} history={useNavigate()} />;
}

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

class CreateItemPage extends Component {
  static defaultProps = {
    text: "Новая задача",
    done: true,
    update: false,
    id: null,
    updateCallback: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      done: this.props.done,
      errorMsg: "",
      successMsg: "",
    };

    // ???: Привязываем метод к классу, чтобы внутри него был доступ к ключевому this
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.handleItemTextChange = this.handleItemTextChange.bind(this);
    this.handleTaskIsDoneChange = this.handleTaskIsDoneChange.bind(this);
    this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
  }

  handleItemTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleTaskIsDoneChange(e) {
    this.setState({ done: e.target.value === "true" ? true : false });
  }

  handleButtonClicked() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.text,
        done: this.state.done,
      }),
    };
    fetch("/api/item/create", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history("/item/" + data.id));
  }

  handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.text,
        done: this.state.done,
        id: this.props.id,
      }),
    };
    fetch("/api/item/update", requestOptions).then((response) => {
      if (response.ok) {
        this.setState({ successMsg: "The item has been successfully updated" });
      } else {
        this.setState({ errorMsg: "Error updating item..." });
      }
      this.props.updateCallback();
    });
  }

  renderCreateButtons() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleButtonClicked}
          >
            Create new item
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back to Home
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderUpdateButtons() {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleUpdateButtonPressed}
        >
          Update the item
        </Button>
      </Grid>
    );
  }

  render() {
    const title = this.props.update ? "Update the item" : "Create new item";

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse
            in={this.state.errorMsg != "" || this.state.successMsg != ""}
          >
            {this.state.successMsg != "" ? (
              <Alert
                severity="success"
                onClose={() => {
                  this.setState({ successMsg: "" });
                }}
              >
                {this.state.successMsg}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  this.setState({ errorMsg: "" });
                }}
              >
                {this.state.errorMsg}
              </Alert>
            )}
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Форма заведения новой задачи</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={this.props.done.toString()}
              onChange={this.handleTaskIsDoneChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Задача уже выполнена"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="Задача не выполнена"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="string"
              defaultValue={this.state.text}
              inputProps={{ style: { textAlign: "center" } }}
              onChange={this.handleItemTextChange}
            />
            <FormHelperText>
              <div align="center">Текст новой задачи</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {this.props.update
          ? this.renderUpdateButtons()
          : this.renderCreateButtons()}
      </Grid>
    );
  }
}

export default withHistory(CreateItemPage);
