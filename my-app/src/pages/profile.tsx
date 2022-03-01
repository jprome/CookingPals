import React, {MouseEvent , useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LoginPass from '../components/loginForm'
import Header from '../components/headerNav'
import { Grid, Container ,Typography, ListItem, Box, Paper} from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { Link} from 'react-router-dom'
import {default as LinkM} from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BasicMenu from '../components/basicMenu';
import Button from '@material-ui/core/Button';
import RecipesSection from '../components/profile/recipesSection'
import RequestsSection from '../components/profile/requestsSection'
import ReferencesSection from '../components/profile/referencesSection'
import { width } from '@mui/system'

const theme = createTheme();

const sections = [
    { title: 'About Me', name: 'about' , index: 0},
    { title: 'References', name: 'references',index:2 },
    { title: 'Friends/Groups', name: 'friends/groups',index:3 },
  ];
  
interface SectionProps {
    section:number
}
const SectionComponent = (s:SectionProps) => {
    if (s.section === 0){
        return <React.Fragment>
                <Grid container spacing={0} rowSpacing={0}>

                    <RequestsSection requests={null}/>
                    
                    <br></br>

                    <RecipesSection cookbooks={null}/>
                </Grid>
            </React.Fragment>
    }
    if (s.section === 1){
        return <React.Fragment>
                    <RequestsSection requests={null}/>
                </React.Fragment>
    }
    if (s.section === 2){
        return <React.Fragment>
                    <ReferencesSection references={null}/>
                </React.Fragment>
        
    }
    if (s.section === 3){
        return <Typography variant="h4">Friends/Groups</Typography>
    }
    else {
        return <Typography> Error</Typography>
    }
}

const Profile = () => {

    const initialState = { section: 0 }
    const [profileState, setProfileState] = useState(initialState)
    

    const clickHandler = (e: MouseEvent<HTMLButtonElement>, index: number): void => {
        e.preventDefault();
        setProfileState({...profileState, section: index})
    }
    
    useEffect(() =>{
        console.log(profileState)

    },[profileState.section])
    
    

    return (
     
        <ThemeProvider theme={theme}>
            <CssBaseline />
          
            <Header />
          
            <Grid container spacing={1}  component="main" style={{ height: '30vh' }}>
                
                <Grid item 
                    xs={12}
                    component={Paper} 
                    elevation={2}
                    sx ={{width:'90vh'}} 
                    square >
                        
                    <Box
                        sx={{
                        my: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: "30vh"
                        }}>
                        
                        <Grid  item><Typography variant="h4">Picture</Typography></Grid> 
                        <Grid  item><Typography variant="h4">Name</Typography></Grid> 
                        
                    </Box> 
                   
                        <Container>
                            <Toolbar
                                component="nav"
                                variant="dense"
                                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>

                                {sections.map((section) => (
                                    <Button key={section.name} onClick={(event) => clickHandler(event,section.index)} > {section.title}</Button>
                                ))}

                                <BasicMenu />
                            </Toolbar>
                        </Container>
                </Grid>
                
                <Grid  container columnSpacing={2} sx={{backgroundColor: '#EEEEEE33', height: "100vh", width:"100%" }}>
                    <Container maxWidth="xl">
                        <Grid item xs={12}>

                            <Box   sx={{
                                mt: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                            }}> 

                            <SectionComponent section={profileState.section}/>
                    
                            </Box>


                        </Grid>
                    </Container>
                </Grid>

            </Grid>
        </ThemeProvider>
    )
}

export default Profile
