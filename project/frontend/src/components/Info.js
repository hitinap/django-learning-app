import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  SEARCH: "pages.search",
  CREATE: "pages.create",
};

export default function Info(props) {
  const [page, setPage] = useState(pages.CREATE);

  function createInfo() {
    return "Info about create page";
  }
  function searchInfo() {
    return "Info about search page";
  }

  useEffect(() => {
    console.log("run");
    return () => console.log("cleanup");
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          What is Items to-do?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.CREATE ? createInfo() : searchInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE
              ? setPage(pages.SEARCH)
              : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateNextIcon />
          ) : (
            <NavigateBeforeIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
