//import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RequestFormSearch from '../components/requestFormSearch';
//import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const SearchRequest = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', pt:5 }}>
              
                <Grid item xs={6}>
                Search requests
                <RequestFormSearch />
                </Grid>
                <Grid item xs={6}>
                Results
                </Grid>

            </Grid>
        </ThemeProvider>
    )
}

export default SearchRequest
