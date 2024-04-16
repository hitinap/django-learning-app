import React, { Component } from "react";
import CreateItemPage from "./CreateItemPage";
import SearchItemPage from "./SearchItemPage";
import Item from "./Item";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  Redirect,
} from "react-router-dom";
import Info from "./Info";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }

  async componentDidMount() {
    fetch("/api/item/on-user")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ id: data.id });
      });
  }

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            To-do List
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/search" component={Link}>
              Search the item
            </Button>
            <Button color="default" to="/info" component={Link}>
              Info
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create new item
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  redirectIfHasItem(id) {
    return id ? <Navigate to={`/item/${id}`} replace /> : this.renderHomePage();
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={this.redirectIfHasItem(this.state.id)} />
          <Route path="/create" element={<CreateItemPage />} />
          <Route path="/info" element={<Info />} />
          <Route path="/search" element={<SearchItemPage />} />
          <Route path="/item/:id" element={<Item />} />
        </Routes>
      </Router>
    );
  }
}
