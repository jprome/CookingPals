//import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Grid, Rating } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postReference } from '../redux/actions/userAction';
import { FormSubmit, InputChange, RootStore } from '../utils/Typescript';
//import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const Reference = () => {

const initialState = { reference: '', rating: 5}
  const [referenceInfo, setUserLogin] = useState(initialState)
  const { reference, rating} = referenceInfo
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setUserLogin({...referenceInfo, [name]:value})
  }
  const handleRatingChange = (n : number ) =>{
    setUserLogin({...referenceInfo, rating:n})
    
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()

    const request = {reference:{
        reference_author: auth.user?._id,
        rating: rating,
        comment: reference,
        date: new Date().toISOString().slice(0, 10)
    },
    to_id:profile._id
    }

    dispatch(postReference(request,auth.access_token!))
    navigate(`/profile/${profile._id}`)

  }

  const { auth } = useSelector((state: RootStore) => state, shallowEqual)
  const { profile } = useSelector((state: RootStore) => state, shallowEqual)
  
 
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main">
              
                <Grid item xs={12}>           
                <Box
                        sx={{
                        my: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                       
                        }}>
                    
                        <Grid  item><Typography variant="h4">Picture</Typography></Grid>
                        
                        <Grid  item><Typography variant="h4">How was you experience with {profile.name} as your CookingPal?</Typography></Grid>  

                        <Box component="form" onSubmit={handleSubmit} >
                            < Grid container justifyContent="center" alignItems="center">
                                <Grid item xs={12}>
                                    <TextField 
                                        fullWidth
                                        multiline
                                        maxRows={4}
                                        margin="normal"  
                                        name="reference" 
                                        value={reference} 
                                        type="reference" 
                                        label="Reference" 
                                        variant="outlined" 
                                        onChange={handleChangeInput}/>
                                </Grid>
                        
                            <Rating 
                                name="size-large" 
                                defaultValue={5} 
                                size="large" 
                                onChange={(event,newValue) => {handleRatingChange(Number(newValue))}}
                            />
                        

                            
                            <Button type="submit" variant="text" fullWidth color="primary" 
                                disabled={(reference && rating) ? false : true} >
                                Send Reference
                            </Button>
                            </Grid>
                        </Box>
                </Box>       
                        </Grid>

            </Grid>
        </ThemeProvider>
    )
}

export default Reference
