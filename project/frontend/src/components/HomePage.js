import React, { Component } from "react";
import CalendarPage from "./CalendarPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
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
        <Routes>
          <Route path="/" element={<p>This is the Home page!</p>} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Router>
    );
  }
}
