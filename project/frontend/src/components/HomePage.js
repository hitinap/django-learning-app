import React, { Component } from "react";
import CalendarPage from "./CalendarPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <p>This is Home page!</p>
          </Route>
          <Route path="/calendar" Component={CalendarPage} />
        </Switch>
      </Router>
    );
  }
}
