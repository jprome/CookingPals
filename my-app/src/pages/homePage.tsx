import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, Box, Paper} from '@mui/material'
import { useNavigate} from 'react-router-dom'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';

import Button from '@material-ui/core/Button';
import { Reference, RootStore } from '../utils/Typescript'
import { shallowEqual } from '../utils/Valid'

import { CheckCircle, RemoveCircle } from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import { findRequests } from '../redux/actions/searchAction';
import { ProfileCard } from '../components/search/profileCard';
import ButtonBases from '../components/recipeBasesHomePage';
import { answerRequest } from '../redux/actions/userAction';


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



const Profile = () => {

    
    const [profileState, setProfileState] = useState()

    const { auth } = useSelector((state: RootStore) => state, shallowEqual)
    const { searchRequest} =  useSelector((state: RootStore) => state, shallowEqual)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const answerFriendRequest = (id:string, answer:number) => {
        //dispatch()
        dispatch(answerRequest(auth,id,answer))
    }

    
    useEffect(() => {
    
        if (!auth.user) {
            console.log("Logging out")
            navigate("/login")
        }
        else{
        const request = {
            give_cooking: 0,
            give_experience: 0,
            give_ingredient: 0,
            receive_cooking:  0,
            receive_experience: 0,
            receive_ingredient: 0,
            diets: auth.user!.request!.diets,
            budgetLow:0,
            budgetHigh:auth.user!.request!.weekly_budget+100,
            location:auth.user!.location!
        }
    

        dispatch(findRequests("Fake Token",request))
        console.log(request)
        }
    },[]);

    return (
     
        <ThemeProvider theme={theme}>
            <Grid container spacing={1} sx={{backgroundColor: '#EEEEEE33'}} component="main">
                          
                <Grid item xs={12} sx={{pl:10,ml:10,pt:10,mt:10,pb:5}}><Typography fontFamily="Helvetica" variant="h2">Welcome back!</Typography></Grid>
                <Grid item xs={12} sx={{pl:10,ml:10,pt:10,mt:10,pb:5}}><Typography fontFamily="Helvetica" variant="h4">Today's Best Recipes</Typography></Grid>
                <Grid item xs={12} sx={{ml:15,mr:15}}> <ButtonBases /></Grid>
                <Grid item xs={12} sx={{ml:15,mr:15}}> <ButtonBases /></Grid>
                <Grid item xs={12} sx={{pl:20,ml:10,mt:10}}><Typography fontFamily="Helvetica" variant="h4">CookingPal Recommendations</Typography></Grid>  
                
                <Grid container>

                    {(searchRequest.users ? searchRequest.users!.map((user) =>
                    {  
                        return ( 
                            <Grid item key={`${user._id}Grid4`} xs={4}>  
                                
                                        <ProfileCard user={user}></ProfileCard>
                                
                            </Grid>)
                    }):<div></div>)
                } 
               </Grid>

               <Grid item xs={12} sx={{pl:20,ml:10,mt:10}}><Typography fontFamily="Helvetica" variant="h4">Friend Requests</Typography></Grid>  

               
                <Grid item xs={12} sx={{mt:3}}>


                {(auth.user ? auth.user!.friendRequestReceived.map((n:any) => {
                    return  <Box sx={{width:"750px", ml:10}}>
                        <Grid  
                            container
                            xs={12}  
                            sx = {{borderRadius: 2, padding: 4, margin:2, alignContent:"left"}}
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
                                <Grid item xs={12} sx={{pl:2,pt:4}}><Typography fontFamily="Helvetica" fontSize={25} variant="h5">Giovanni Ferioli</Typography></Grid> 
                            </Grid>
                        
                        </Grid>
                    
                            <Grid item xs={1} sx={{pt:3}}><Button onClick={()=> {answerFriendRequest(n,2)}}><CheckCircle color="success" fontSize="large"></CheckCircle></Button></Grid>

                            <Grid item xs={1} sx={{pt:3}}><Button  onClick={()=> {answerFriendRequest(n,3)}}><RemoveCircle sx={{ color: pink[500] }} fontSize="large"></RemoveCircle></Button></Grid>
                        
                        </Grid>

                    </Box>

                }):<div></div>)
            }
            
            </Grid>

                <Button  onClick={() => navigate('/profile/6229148ca8745d1a30fcad60')}>Go to Gio's Profile</Button>
                
            </Grid>
        </ThemeProvider>
    )
}

export default Profile