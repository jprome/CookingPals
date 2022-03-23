import React, {MouseEvent , useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Container ,Typography, Box, Paper} from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { useLocation, useNavigate} from 'react-router-dom'
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
import { getOtherInfo } from '../redux/actions/userAction';

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
    diets: string[],
    description: string,
    budget: number,
    active:boolean,
    st(): void,
    se(): void,
    own: boolean
}

const SectionComponent = (s:SectionProps) => {
    if (s.section === 0){
        return <React.Fragment>
                <Grid container spacing={0} rowSpacing={0}>

                    <RequestsSection  
                        give={s.give} 
                        receive={s.receive} 
                        diets={s.diets} 
                        description={s.description} 
                        budget={s.budget} 
                        active={s.active}
                        changeSection={s.st}
                        own={s.own}
                        />

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
    if (s.section === 4 && s.own){
        return <Grid container spacing={0} rowSpacing={0}>

                <EditRequestsSection  
                    give={s.give} 
                    receive={s.receive} 
                    diets={s.diets} 
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
        return <Typography>Error</Typography>
    }
}

const Profile = () => {

    const initialState = { section: 0 , own: false, give: [0,0,0], receive:[0,0,0]}
    const [profileState, setProfileState] = useState(initialState)

    const { auth } = useSelector((state: RootStore) => state, shallowEqual)
    const { profile } = useSelector((state: RootStore) => state, shallowEqual)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {

        if (!auth.user) {
            navigate("/login")
        }
        if (location.pathname.substring(9) == auth.user?._id){
            setProfileState({...profileState, own: true,
            give : [auth.user!.request!.give_ingredient,auth.user!.request!.give_experience,auth.user!.request!.give_cooking],
            receive : [auth.user!.request!.receive_ingredient,auth.user!.request!.receive_experience,auth.user!.request!.receive_cooking]})
        }
        else if (profile._id == "asdfadsf") {
            dispatch(getOtherInfo(location.pathname.substring(9)))
            setProfileState({...profileState, own: false}) // Need to add error - wrong id
            
        }
        else {
            setProfileState({...profileState, own: false,
            give : [profile.request!.give_ingredient,profile.request!.give_experience,profile.request!.give_cooking],
            receive : [profile.request!.receive_ingredient,profile.request!.receive_experience,profile.request!.receive_cooking]})
        }

    },[location.pathname]);

   

    const clickHandler = (e: MouseEvent<HTMLButtonElement>, index: number): void => {
        e.preventDefault();
        setProfileState({...profileState, section: index})
    }

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
                                {(!profileState.own ? <BasicMenu own={profileState.own} /> : <div></div>)}
                                
                            </Toolbar>
                        </Container>
                </Grid>
                <Button  onClick={() => navigate('/profile/622918e0a8745d1a30fcad74')}>Go to Gio's Profile</Button>
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
                                description={profileState.own ? auth.user!.request!.description : profile.request!.description} 
                                section={profileState.section} 
                                give={profileState.give} 
                                receive={profileState.receive} 
                                diets={profileState.own ? auth.user!.request!.diets :  profile.request!.diets}
                                budget={profileState.own ? auth.user!.request!.weekly_budget: profile.request!.weekly_budget}
                                active={profileState.own ? auth.user!.request!.active : profile.request!.active}
                                st={() => setProfileState({ ...profileState, section: 4 , own: profileState.own })}
                                se={() => setProfileState({ ...profileState, section: 0 , own: profileState.own })}
                                own={profileState.own}
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