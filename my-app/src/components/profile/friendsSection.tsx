import * as React from 'react';
import { Grid, Box, Paper, Typography, Divider} from '@mui/material';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

interface FriendsProps {
  friends: any 
}

const lightTheme = createTheme({ palette: { mode: 'light' } });

const MyPaper = styled(Paper)({   height: 400, lineHeight: '60px' });
export default function FriendsSection(props: FriendsProps) {
  //const { sections, title } = props;


  return (
    <React.Fragment>
            <Grid container>
                {[0,1].map((a) => (
                    
                    <Grid item xs={6} sx={{padding:2}}>
                        
                        <Grid  
                            container
                            xs={12}  
                            sx = {{borderRadius: 6, padding:4}}
                            //sm={8} 
                            //md={5} 
                            component={Paper} 
                            elevation={3} 
                            square 
                            >
                                {[0,1,3].map((n)=> (

                                    <Grid item xs={12}> 
                                    
                                        <Grid container  sx={{pb:2,pt:2,margin:1, alignContent:"left"}}>
                                            <Grid item xs={2}>
                                            <img 
                                                style={{ 
                                                    zIndex:-5, 
                                                    borderRadius:"75px",
                                                    height:"150px", 
                                                    width:"150px"}} 
                                                className="login-photo" 
                                                src={require("../../images/01.jpg")} 
                                                alt={"login"}/>
                                            </Grid>

                                            <Grid item xs={8}>
                                                <Grid container sx={{justifyContent:"left", textAlign:"left"}}>
                                                    <Grid item xs={12} sx={{pl:10,pt:6}}><Typography fontFamily="Helvetica" fontSize={25} variant="h5">Giovanni Ferioli</Typography></Grid> 
                                                   
                                                </Grid>
                                                
                                            </Grid>
                                        </Grid>
                                            {( n != 3 )?  
                                                <Divider />   : <div></div>}
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>
                    
                ))} 
            </Grid>
       
    </React.Fragment>
  );
}