import React, { useCallback, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { InputChange, FormSubmit, RootStore } from '../utils/Typescript'
//import { Stack }  from '@material-ui/core'
import { Button, TextField, Grid, Box } from "@material-ui/core"
import { login } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const LoginPass = () => {
  const initialState = { account: '', password: ''}
  const [userLogin, setUserLogin] = useState(initialState)
  const { account, password} = userLogin
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setUserLogin({...userLogin, [name]:value})
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    // send login request
    dispatch(login(userLogin))
  }

  const { auth } = useSelector((state: RootStore) => state, shallowEqual)

  const setToProfile = useCallback(() => {
    const route = `/profile/${auth.user?._id}`
    console.log("Navigating to profile")
    navigate(route)

  },[navigate,auth.user?._id]);

  useEffect(() =>{
    if (auth.user) {
      if (auth.user._id && auth.access_token)
        setToProfile()
    }
  },[auth.user,auth.access_token, setToProfile])

 
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

