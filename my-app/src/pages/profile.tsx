import React, {MouseEvent , useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Container ,Typography, Box, Paper} from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { useNavigate} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import CssBaseline from '@mui/material/CssBaseline';
import BasicMenu from '../components/basicMenu';
import Button from '@material-ui/core/Button';
import RecipesSection from '../components/profile/recipesSection'
import RequestsSection from '../components/profile/requestsSection'
import ReferencesSection from '../components/profile/referencesSection'
import { RootStore } from '../utils/Typescript'
import { shallowEqual } from '../utils/Valid'
import EditRequestsSection from '../components/edit-profile/editRequestSection';

const theme = createTheme();

const sections = [
    { title: 'About Me', name: 'about' , index: 0},
    { title: 'References', name: 'references',index:2 },
    { title: 'Friends/Groups', name: 'friends/groups',index:3 },
  ];
  
interface SectionProps {
    section:number,
    give: number[],
    receive: number[],
    diet: string[],
    description: string,
    budget: number,
    active:boolean,
    st(): void,
    se(): void
}
const SectionComponent = (s:SectionProps) => {

    if (s.section === 0){
        return <React.Fragment>
                <Grid container spacing={0} rowSpacing={0}>

                    <RequestsSection  
                        give={s.give} 
                        receive={s.receive} 
                        diet={s.diet} 
                        description={s.description} 
                        budget={s.budget} 
                        active={s.active}
                        changeSection={s.st}/>

                    <RecipesSection cookbooks={null}/>
                </Grid>
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
    if (s.section === 4 ){
        return <Grid container spacing={0} rowSpacing={0}>

                <EditRequestsSection  
                    give={s.give} 
                    receive={s.receive} 
                    diets={s.diet} 
                    description={s.description} 
                    budget={s.budget}
                    active={s.active}
                    changeSection={s.se}
                />
                <br></br>
                <RecipesSection cookbooks={null}/>
            </Grid>
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

    const { auth } = useSelector((state: RootStore) => state, shallowEqual)
    useEffect(() =>{
        console.log(profileState)
        
    },[profileState.section,profileState])
   
    const navigate = useNavigate();

    if (!auth.user) {
        navigate("/login")
    }
  
    const give = [auth.user!.request!.give_ingredient,auth.user!.request!.give_experience,auth.user!.request!.give_cooking]
    const receive = [auth.user!.request!.receive_ingredient,auth.user!.request!.receive_experience,auth.user!.request!.receive_cooking]

    return (
     
        <ThemeProvider theme={theme}>
          
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

                            <SectionComponent 
                                description={auth.user!.request!.description} 
                                section={profileState.section} 
                                give={give} 
                                receive={receive} 
                                diet={auth.user!.request!.diet}
                                budget={auth.user!.request!.weekly_budget}
                                active={auth.user!.request!.active}
                                st={() => setProfileState({ section: 4 })}
                                se={() => setProfileState({ section: 0 })}
                                />
                            </Box>
                        </Grid>
                    </Container>
                </Grid>

            </Grid>
        </ThemeProvider>
    )
}

export default Profile
