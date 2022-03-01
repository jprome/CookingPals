//import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const SearchRequest = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" style={{ height: '100vh' }}>
              

                Search requests
            </Grid>
        </ThemeProvider>
    )
}

export default SearchRequest
