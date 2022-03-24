import React, {MouseEvent , useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Grid, Container ,Typography, Box, Paper} from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { useNavigate} from 'react-router-dom'
//import CssBaseline from '@mui/material/CssBaseline';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import SmallRequestsSection from './smallRequestsSection';


import { IUser, RootStore } from '../../utils/Typescript';

const theme = createTheme();
const MyPaper = styled(Paper)({ height: "fit-content", lineHeight: '60px' });

interface profileCardProps {
    user: IUser
}

const ProfileCards = () => {
    
    const { searchRequestReducer } = useSelector((state: RootStore) => state, shallowEqual)

    return (
        <div>
            {(searchRequestReducer.msg != 'successfull') ? <div><Button>Complete Search Request {searchRequestReducer.msg}</Button></div> : 
            <div>
                <Grid container>
                {searchRequestReducer.users!.map((user) =>
                {  
                    return ( 
                        <Grid item key={`${user._id}Grid4`} xs={12}>  
                            
                                    <ProfileCard user={user}></ProfileCard>
                            
                        </Grid>)
                })}
               </Grid>
            </div>
            }
        </div>
    )
}

export default ProfileCards

const ProfileCard = (props: profileCardProps) => {

    return (
    <ThemeProvider theme={theme}>

            <Grid container spacing={1} sx={{pt:3}}  >         
                <Grid item  xs={12}>
                    <Box   
                            sx={{
                                p:15,
                                pt:0,
                                pb:0,
                                gridTemplateColumns: { md: '1fr 1fr' },
                                textAlign: 'center',
                            }}
                    >
                    <MyPaper elevation={5}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pt: 5
                                }}>
                                
                                <Grid  item><Typography variant="h4">Picture</Typography></Grid> 
                                <Grid  item><Typography variant="h4">{props.user.name}</Typography></Grid> 
                            
                            </Box> 
                        
                            <Grid item xs={12}>
                                <Box   sx={{

                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        p:5
                                }}> 
                                <SmallRequestsSection   
                                        description={props.user.request!.description} 
                                        give={[props.user.request!.give_ingredient,props.user.request!.give_experience,props.user.request!.give_cooking]}
                                        receive={ [props.user.request!.receive_ingredient,props.user.request!.receive_experience,props.user.request!.receive_cooking]} 
                                        diets={props.user.request!.diets}
                                        budget={props.user.request!.weekly_budget}
                                        active={props.user.request!.active}
                                        />
                                </Box>
                            </Grid>
                    </MyPaper>
                </Box>
            </Grid>
        </Grid>
     </ThemeProvider>
    )
}
