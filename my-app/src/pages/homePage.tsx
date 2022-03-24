import React, {MouseEvent , useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Container ,Typography, Box, Paper} from '@mui/material'
import { useLocation, useNavigate} from 'react-router-dom'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
//import CssBaseline from '@mui/material/CssBaseline';
import BasicMenu from '../components/basicMenu';
import Button from '@material-ui/core/Button';
import { Reference, RootStore } from '../utils/Typescript'
import { shallowEqual } from '../utils/Valid'

import { CheckCircle, RemoveCircle } from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import { findRequests } from '../redux/actions/searchAction';


const theme = createTheme({ palette: { mode: 'light' } });

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
    own: boolean,
    references: Reference []
}

const MyPaper = styled(Paper)({ height: "fit-content" });


const Profile = () => {


    const [profileState, setProfileState] = useState()

    const { auth } = useSelector((state: RootStore) => state, shallowEqual)
    const { profile } = useSelector((state: RootStore) => state, shallowEqual)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {

        const request = {
            give_cooking: auth.user!.request!.give_cooking,
            give_experience: auth.user!.request!.give_experience,
            give_ingredient: auth.user!.request!.give_ingredient,
            receive_cooking:  auth.user!.request!.receive_cooking,
            receive_experience: auth.user!.request!.receive_experience,
            receive_ingredient: auth.user!.request!.receive_ingredient,
            diets: auth.user!.request!.diets,
            budgetLow:0,
            budgetHigh:auth.user!.request!.weekly_budget+100,
            location:auth.user!.location!
    }
    
    dispatch(findRequests("Fake Token",request))
    console.log(request)


    },[]);

    return (
     
        <ThemeProvider theme={theme}>
           
            <Grid container spacing={1} sx={{backgroundColor: '#EEEEEE33'}} component="main">
            <Grid item xs={12}> 
               
            <Box sx={{width:"750px"}}>
             <Grid  
                container
                xs={12}  
                sx = {{borderRadius: 2, pt:10, padding:4, margin:10, alignContent:"left"}}
                //sm={8} 
                //md={5} 
                component={Paper} 
                elevation={3} 
                square 
                >
                <Grid item xs={2}>
                <img 
                    style={{ 
                        zIndex:-5, 
                        borderRadius:"50px",
                        height:"100px", 
                        width:"100px"}} 
                    className="login-photo" 
                    src={require("../images/01.jpg")} 
                    alt={"login"}/>
                </Grid>

                <Grid item xs={8}>
                    <Grid container sx={{justifyContent:"left", textAlign:"left"}}>
                        <Grid item xs={12} sx={{pl:2}}><Typography fontFamily="Helvetica" fontSize={25} variant="h5">Giovanni Ferioli</Typography></Grid> 
                        <Grid item xs={12} sx={{pl:2}}><Typography fontFamily="Helvetica" variant="h6">Hey Jose! Lets talk about cooking</Typography></Grid> 
                    </Grid>
                    
                </Grid>

                
                <Grid item xs={1} sx={{pt:2}}><Button><CheckCircle color="success" fontSize="large"></CheckCircle></Button></Grid>

                <Grid item xs={1} sx={{pt:2}}><Button><RemoveCircle sx={{ color: pink[500] }} fontSize="large"></RemoveCircle></Button></Grid>
                
                </Grid>

            </Box>
            
            </Grid>

                <Button  onClick={() => navigate('/profile/6229148ca8745d1a30fcad60')}>Go to Gio's Profile</Button>
                
            </Grid>
        </ThemeProvider>
    )
}

export default Profile