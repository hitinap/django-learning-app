import React, { Component } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

function withHistory(Component) {
  return (props) => <Component {...props} history={useNavigate()} />;
}

class SearchItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      error: "",
    };
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Search the item by ID
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={this.state.error}
            label="id"
            placeholder="enter the id"
            value={this.state.id}
            helperText={this.state.error}
            variant="outlined"
            onChange={(e) => {
              this.setState({ id: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: this.state.id,
                }),
              };
              fetch("/api/search", requestOptions)
                .then((response) => {
                  if (response.ok) {
                    this.props.history(`/item/${this.state.id}`);
                  } else {
                    this.setState({ error: "Invalid ID." });
                  }
                })
                .catch((error) => console.log(error));
            }}
          >
            Go
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withHistory(SearchItemPage);
