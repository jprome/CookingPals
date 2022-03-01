import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';
import { Grid, Container ,Typography, ListItem, Box, Paper} from '@mui/material'
import { RequestCP } from '../../utils/Typescript';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button } from '@material-ui/core';
import CustomizedDialogs from '../dialog';

interface RequestProps {
  requests: RequestCP [] | null
}

const lightTheme = createTheme({ palette: { mode: 'light' } });

const MyPaper = styled(Paper)({ height: "fit-content", lineHeight: '60px' });
export default function RequestsSection(props: RequestProps) {
  //const { sections, title } = props;

  return (
    <React.Fragment>
          <Grid item 
                xs={12}  
                sx = {{borderRadius: 4}}
                //sm={8} 
                //md={5} 
                //component={Paper} 
                //elevation={5} 
                //square 
                >
                <Grid container spacing={2}>
                    {[1].map((n) => (
                    <Grid item xs={12} key={n} spacing={3} columnSpacing={10}>
                        <ThemeProvider theme={lightTheme}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: 'background.default',
                                    //display: 'grid',
                                    gridTemplateColumns: { md: '1fr 1fr' },
                                    gap: 2,
                                    textAlign: 'center'
                                }}
                                >
                               
                                <MyPaper key={n} elevation={5} >
                                    {`Request ${n}`}
                                    <Grid container> 

                                        <Grid item xs={1}>
                                            <Grid container rowSpacing={7}>
                                                <Grid item xs={12}>
                                                    <Box>
                                                        Give:
                                                    </Box>
                                                </Grid>
                                     
                                                <Grid item xs={12}>
                                                    <Box >
                                                        Receive:
                                                    </Box>
                                                </Grid>
                                 
                                                <Grid item xs={12}>
                                                <Box >
                                                        Diets:
                                                </Box>
                                                    
                                                </Grid>
                                            
                                           </Grid>
                                        </Grid>

                                        <Grid item xs={3}>

                                            <Grid container >
                                                <Grid item xs={4}> 
                                                <img 
                                                    style={{ 
                                                        //position:"fixed", 
                                                        zIndex:10, 
                                                        padding:2,
                                                        height:"80px", 
                                                        width:"80px"}} 
                                                    className="1" 
                                                    src={require("../../images/ingredient.png")} 
                                                    alt={"1"}/>
                                                </Grid>

                                                <Grid item xs={4}>
                                                <img 
                                                    style={{ 
                                                        //position:"fixed", 
                                                        padding:2,
                                                        zIndex:10, 
                                                        height:"90px", 
                                                        width:"90px"}} 
                                                    className="2" 
                                                    src={require("../../images/experience.png")} 
                                                    alt={"2"}/>
                                                </Grid>

                                                <Grid item xs={4}>
                                                <img 
                                                    style={{ 
                                                        //position:"fixed",
                                                        padding:2, 
                                                        zIndex:10, 
                                                        height:"90px", 
                                                        width:"90px"}} 
                                                    className="3" 
                                                    src={require("../../images/cooking.png")} 
                                                    alt={"3"}/>
                                                </Grid>

                                            </Grid>

                                            <Grid container >
                                                <Grid item xs={4}> 
                                                <img 
                                                    style={{ 
                                                        //position:"fixed", 
                                                        zIndex:10, 
                                                        padding:2,
                                                        height:"80px", 
                                                        width:"80px"}} 
                                                    className="1" 
                                                    src={require("../../images/ingredient.png")} 
                                                    alt={"1"}/>
                                                </Grid>

                                                <Grid item xs={4}>
                                                <img 
                                                    style={{ 
                                                        //position:"fixed", 
                                                        padding:2,
                                                        zIndex:10, 
                                                        height:"90px", 
                                                        width:"90px"}} 
                                                    className="2" 
                                                    src={require("../../images/experience.png")} 
                                                    alt={"2"}/>
                                                </Grid>

                                                <Grid item xs={4}>
                                                <img 
                                                    style={{ 
                                                        //position:"fixed",
                                                        padding:2, 
                                                        zIndex:10, 
                                                        height:"90px", 
                                                        width:"90px"}} 
                                                    className="3" 
                                                    src={require("../../images/cooking.png")} 
                                                    alt={"3"}/>
                                                </Grid>

                                            </Grid>

                                            <Grid container >
                                                <Grid item xs={4}> 
                                                <img 
                                                    style={{ 
                                                        //position:"fixed", 
                                                        zIndex:10, 
                                                        padding:2,
                                                        height:"80px", 
                                                        width:"80px"}} 
                                                    className="1" 
                                                    src={require("../../images/ingredient.png")} 
                                                    alt={"1"}/>
                                                </Grid>

                                                <Grid item xs={4}>
                                                <img 
                                                    style={{ 
                                                        //position:"fixed", 
                                                        padding:2,
                                                        zIndex:10, 
                                                        height:"90px", 
                                                        width:"90px"}} 
                                                    className="2" 
                                                    src={require("../../images/experience.png")} 
                                                    alt={"2"}/>
                                                </Grid>

                                                <Grid item xs={4}>
                                                <img 
                                                    style={{ 
                                                        //position:"fixed",
                                                        padding:2, 
                                                        zIndex:10, 
                                                        height:"90px", 
                                                        width:"90px"}} 
                                                    className="3" 
                                                    src={require("../../images/cooking.png")} 
                                                    alt={"3"}/>
                                                </Grid>

                                            </Grid>


                                        </Grid>


                                        
                                         

                                            <Grid item xs={8}>
                                                <Box sx={{ pr: 5 , typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left' }}>
                                                    Looking for people to partner with that like to eat plant based meals. 
                                                    I am fine with eating meat every once in a while, but would prefer for
                                                    the diet to be mostly meat. Message for more details!
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    
                                    
                                    </MyPaper>
                           
                            </Box>
                        </ThemeProvider>
                    </Grid>))}
                </Grid>
            </Grid>
    </React.Fragment>
  );
}