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
import { Cookbook, Reference, RootStore } from '../utils/Typescript'
import { shallowEqual } from '../utils/Valid'
import EditRequestsSection from '../components/edit-profile/editRequestSection';
import { getOtherInfo } from '../redux/actions/userAction';
import FriendsSection from '../components/profile/friendsSection';

const theme = createTheme();

const sections = [
    { title: 'About Me', name: 'about' , index: 0},
    { title: 'References', name: 'references',index:2 },
    { title: 'Friends/Groups', name: 'friends/groups',index:3 },
  ];
  
interface SectionProps {
    section:number,
    give: number[],
    diets: string[],
    description: string,
    budget: number,
    active:boolean,
    st(): void,
    se(): void,
    own: boolean,
    references: any,
    cookbooks: any
}

const SectionComponent = (s:SectionProps) => {
    if (s.section === 0){
     
        return <React.Fragment>
                <Grid container spacing={0} rowSpacing={0}>

                    <RequestsSection  
                        give={s.give} 
                        diets={s.diets} 
                        description={s.description} 
                        budget={s.budget} 
                        active={s.active}
                        changeSection={s.st}
                        own={s.own}
                        />

                    <RecipesSection  own={s.own} cookbooks={s.cookbooks}/>
                </Grid>
            </React.Fragment>
    }
    if (s.section === 2){
        return <React.Fragment>
                    <ReferencesSection references={s.references}/>
                </React.Fragment>
        
    }
    if (s.section === 3){
        return <FriendsSection friends={[]} />
    }
    if (s.section === 4 && s.own){
        return <Grid container spacing={0} rowSpacing={0}>

                <EditRequestsSection  
                    give={s.give} 
                    diets={s.diets} 
                    description={s.description} 
                    budget={s.budget}
                    active={s.active}
                    changeSection={s.se}
                />
                <br></br>
                <RecipesSection own={s.own}cookbooks={s.cookbooks}/>
            </Grid>
    }
    else {
        return <Typography>Error</Typography>
    }
}

const Profile = () => {

    const initialState = { section: 0 , own: true, give: [0,0,0], receive:[0,0,0]}
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
            give : [auth.user!.request!.ingredient,auth.user!.request!.experience,auth.user!.request!.cooking]})
        
        }
        else if (profile._id != location.pathname.substring(9) ) {
            dispatch(getOtherInfo(location.pathname.substring(9),auth.access_token!))
            setProfileState({...profileState, own: false}) // Need to add error - wrong id
            
        }
        else {
            setProfileState({...profileState, own: false,
            give : [profile.request!.ingredient,profile.request!.experience,profile.request!.cooking]})
       
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
                        <Grid  item><Typography variant="h4">{profileState.own ? auth.user!.name : profile!.name}</Typography></Grid> 
                        
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
                                diets={profileState.own ? auth.user!.request!.diets :  profile.request!.diets}
                                budget={profileState.own ? auth.user!.request!.weekly_budget: profile.request!.weekly_budget}
                                active={profileState.own ? auth.user!.request!.active : profile.request!.active}
                                st={() => setProfileState({ ...profileState, section: 4 , own: profileState.own })}
                                se={() => setProfileState({ ...profileState, section: 0 , own: profileState.own })}
                                own={profileState.own}
                                references={profileState.own ? auth.user!.references! :  profile.references!}
                                cookbooks={profileState.own ? auth.user!.cookbook! :  profile.cookbook!}
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