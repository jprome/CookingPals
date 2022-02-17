import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';
import { Grid, Container ,Typography, ListItem, Box, Paper} from '@mui/material'
import { Reference } from '../../utils/Typescript';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button } from '@material-ui/core';
import CustomizedDialogs from '../dialog';

interface ReferencesProps {
  references: Reference [] | null
}

const lightTheme = createTheme({ palette: { mode: 'light' } });

const MyPaper = styled(Paper)({   height: 400, lineHeight: '60px' });
export default function ReferencesSection(props: ReferencesProps) {
  //const { sections, title } = props;

  return (
    <React.Fragment>
          <Grid container 
                xs={12}  
                sx = {{borderRadius: 4}}
                //sm={8} 
                //md={5} 
                component={Paper} 
                elevation={5} 
                square 
                >
                <Grid container spacing={2}>
                    {[1,2].map((n) => (
                    <Grid item xs={12} key={n} spacing={2} columnSpacing={10}>
                        <ThemeProvider theme={lightTheme}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: 'background.default',
                                    gridTemplateColumns: { md: '1fr 1fr' },
                                    gap: 5,
                                    textAlign: 'center'
                                }}
                                >
                                    <MyPaper key={n} elevation={5}>
                                        {`References ${n}`}
                                    </MyPaper> 
                            </Box>
                        </ThemeProvider>
                    </Grid>))}
                </Grid>
            </Grid>
    </React.Fragment>
  );
}