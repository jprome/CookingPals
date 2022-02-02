import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { InputChange, FormSubmit } from '../utils/Typescript'
//import { Stack }  from '@material-ui/core'
import { Button, TextField, Grid, Box } from "@material-ui/core"

const LoginPass = () => {
  const initialState = { account: '', password: '' }
  const [userLogin, setUserLogin] = useState(initialState)
  const { account, password } = userLogin

  const dispatch = useDispatch()

  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setUserLogin({...userLogin, [name]:value})
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    //dispatch(login(userLogin))
    console.log("Button Pressed", userLogin)
  }

  return (
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
  )
}

export default LoginPass

