import * as React from 'react';
import { Grid, Box, Paper} from '@mui/material';
import { Reference } from '../../utils/Typescript';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Typography } from '@material-ui/core';

import ingredientIcon from "../../images/ingredient.png";
import cookingIcon from "../../images/cooking.png";
import experienceIcon from "../../images/experience.png";

interface ReferencesProps {
  references: Reference [] 
}

const lightTheme = createTheme({ palette: { mode: 'light' } });

const MyPaper = styled(Paper)({   height: 400, lineHeight: '60px' });
export default function ReferencesSection(props: ReferencesProps) {
  //const { sections, title } = props;


  return (
    <React.Fragment>
          <Grid  
                item
                xs={12}  
                sx = {{borderRadius: 4, pt:5}}
                //sm={8} 
                //md={5} 
                component={Paper} 
                elevation={5} 
                square 
                >
                <Grid container spacing={2}>
                    {props.references.map((n) => (
                    <Grid item xs={12} key={n._id} spacing={2} columnSpacing={10}>

                        <ThemeProvider theme={lightTheme}>

                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: 'background.default',
                                    gridTemplateColumns: { md: '1fr 1fr' },
                                    textAlign: 'right'
                                }}
                                >
                                    <MyPaper key={n._id} elevation={5}>
                                       <Box sx={{padding: 2}}>

                                        <Grid container>
                                            <Grid item xs={7}>
                                                <Grid container>
                                                    <Grid item xs={2} sx={{textAlign: 'left', pt:2,pl:5}}>
                                                    <img 
                                                        style={{ 
                                                            zIndex:-5, 
                                                            borderRadius:"50px",
                                                            height:"100px", 
                                                            width:"100px"}} 
                                                        className="login-photo" 
                                                        src={require("../../images/01.jpg")} 
                                                        alt={"login"}/>
                                                    </Grid>
                                                    <Grid item xs={10} sx={{textAlign: 'left', pt:3,pl:3}} >
                                                    <Typography variant="h6">Jose Romero</Typography>
                                                
                                                        03/23/2015
                                                    </Grid>
                                                    <Grid item xs={12} sx={{textAlign: 'left', pt:2,pl:5}}>
                                                    <Typography variant="h6" >{n.comment}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Box sx={{
                                                            display: 'flex',

                                                            }}>
                                                <Grid container >
                                                        <Grid item xs={6} 
                                                         sx={{justifyContent: 'right', alignItems:'right'}}>       
                                                                <img 
                                                                style={{ 
                                                                    zIndex:-5, 
                                                                    height:"175px", 
                                                                    width:"175px"}} 
                                                                className="login-photo" 
                                                                src={require("../../images/01.jpg")} 
                                                                alt={"login"}/>
                                                        </Grid>
                                                        <Grid item xs={6}  sx={{justifyContent: 'center'}}>
                                                                <img 
                                                                        style={{ 
                                                                            zIndex:-5, 
                                                                            height:"175px", 
                                                                            width:"175px"}} 
                                                                        className="login-photo" 
                                                                        src={require("../../images/01.jpg")} 
                                                                        alt={"login"}/>
                                                        </Grid>
                                                            <Grid item xs={6}>
                                                                <img 
                                                                        style={{ 
                                                                            zIndex:-5, 

                                                                            height:"175px", 
                                                                            width:"175px"}} 
                                                                        className="login-photo" 
                                                                        src={require("../../images/01.jpg")} 
                                                                        alt={"login"}/>
                                                        </Grid>
                                                        
                                                        <Grid item xs={6}>
                                                                <img 
                                                                        style={{ 
                                                                            zIndex:-5, 
                                                                            height:"175px", 
                                                                            width:"175px"}} 
                                                                        className="login-photo" 
                                                                        src={require("../../images/01.jpg")} 
                                                                        alt={"login"}/>
                                                        </Grid>
                                                </Grid>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        </Box>
                                    </MyPaper> 

                            </Box>
                        </ThemeProvider>
                    </Grid>))}
                </Grid>
            </Grid>
    </React.Fragment>
  );
}