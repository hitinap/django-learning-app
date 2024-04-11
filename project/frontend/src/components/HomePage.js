import React, { Component } from "react";
import CreateItemPage from "./CreateItemPage";
import SearchItemPage from "./SearchItemPage";
import Item from "./Item";
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
          <Route path="/create" element={<CreateItemPage />} />
          <Route path="/search" element={<SearchItemPage />} />
          <Route path="/item/:id" element={<Item />} />
        </Routes>
      </Router>
    );
  }
}
