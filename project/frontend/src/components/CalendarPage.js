import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CalendarPage extends Component {
  defaultItemText = "Новая задача";

  constructor(props) {
    super(props);
    this.state = {
      text: this.defaultItemText,
      done: true,
    };

    // ???: Привязываем метод к классу, чтобы внутри него был доступ к ключевому this
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.handleItemTextChange = this.handleItemTextChange.bind(this);
    this.handleTaskIsDoneChange = this.handleTaskIsDoneChange.bind(this);
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
      .then((data) => console.log(data));
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create new Item
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Форма заведения новой задачи</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
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
              defaultValue={this.defaultItemText}
              inputProps={{ style: { textAlign: "center" } }}
              onChange={this.handleItemTextChange}
            />
            <FormHelperText>
              <div align="center">Текст новой задачи</div>
            </FormHelperText>
          </FormControl>
        </Grid>
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
}
