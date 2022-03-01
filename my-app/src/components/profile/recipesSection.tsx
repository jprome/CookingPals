import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';
import { Grid, Container ,Typography, ListItem, Box, Paper} from '@mui/material'
import { Cookbook } from '../../utils/Typescript';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button } from '@material-ui/core';
import CustomizedDialogs from '../dialog';

interface RecipesProps {
  cookbooks: Cookbook [] | null
}

const lightTheme = createTheme({ palette: { mode: 'light' } });

const MyPaper = styled(Paper)({   height: 180, lineHeight: '60px' });
export default function RecipesSection(props: RecipesProps) {
  //const { sections, title } = props;

  return (
    <React.Fragment>
          <Grid item 
                xs={12}  
                sx = { {borderRadius: 4, mt:5}}
                //sm={8} 
                //md={5} 
                component={Paper} 
                elevation={5} 
                square 
                
                >
                <Grid container spacing={2}>
                    {[lightTheme].map((theme, index) => (
                    <Grid item xs={12} key={index} spacing={3} columnSpacing={10}>
                        <ThemeProvider theme={theme}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: 'background.default',
                                    display: 'grid',
                                    gridTemplateColumns: { md: '1fr 1fr' },
                                    gap: 2,
                                    textAlign: 'center'
                                }}
                                >
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                    <MyPaper key={n} elevation={5}>
                                    {`Cookbook ${n}`}
                                    <CustomizedDialogs />
                                    </MyPaper>
                                ))}
                            </Box>
                        </ThemeProvider>
                    </Grid>))}
                </Grid>
            </Grid>
    </React.Fragment>
  );
}