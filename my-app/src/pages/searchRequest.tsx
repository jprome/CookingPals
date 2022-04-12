//import React, { useState } from 'react'
import { Grid, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RequestFormSearch from "../components/requestFormSearch";
import ProfileCards from "../components/search/profileCard";
//import CssBaseline from '@mui/material/CssBaseline';

const SearchRequest = () => {
  return (
    <Box>
      <Grid container component="main" sx={{ pt: 5, display: "flex" }}>
        <Grid item xs={6}>
          <RequestFormSearch />
        </Grid>
        <Grid item xs={6}>
          <ProfileCards />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchRequest;
