import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { InputChange, FormSubmit, RootStore } from '../utils/Typescript'
//import { Stack }  from '@material-ui/core'
import { Button, TextField, Grid, Box } from "@material-ui/core"
import {Navigate} from "react-router-dom";
import { IUser } from '../utils/Typescript';
import { login } from '../redux/actions/authAction';

const LoginPass = () => {
  const initialState = { account: '', password: '', validate:false}
  const [userLogin, setUserLogin] = useState(initialState)
  const [toProfile, setToProfile] = React.useState(false)
  const { account, password, validate} = userLogin

  const dispatch = useDispatch()

  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setUserLogin({...userLogin, [name]:value})
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  
    console.log("Button Pressed", userLogin)
    // send login request
    dispatch(login(userLogin))
  }

  const { auth } = useSelector((state: RootStore) => state, shallowEqual)

  useEffect(() =>{
    if (auth.user) {
        setToProfile(true)
    }
  })

  if (toProfile === true) {
    const route = `/profile/${auth.user?._id}`
    return <Navigate to={route}/>
  }

  return (

    <div>

    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        < Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
              <TextField 
                fullWidth
                margin="normal"  
                name="account" 
                value={account} 
                type="email" 
                label="Email" 
                variant="outlined" 
                onChange={handleChangeInput}/>
          </Grid>
          <Grid item xs={12}>
            <TextField  
              fullWidth
              margin="normal"   
              name="password" 
              value={password} 
              type="password" 
              label="Password" 
              variant="outlined" 
              onChange={handleChangeInput}/>
            </Grid>
          
          <Button type="submit" variant="text" fullWidth color="primary" 
            disabled={(account && password) ? false : true} >
            Login
          </Button>
        </Grid>
    </Box>
    </div>
  )
}

export default LoginPass

