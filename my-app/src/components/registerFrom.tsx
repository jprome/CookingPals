import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputChange, FormSubmit, RootStore } from "../utils/Typescript";
//import { Stack }  from '@material-ui/core'
import { Button, TextField, Grid, Box } from "@material-ui/core";
import { shallowEqual } from "../utils/Valid";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const RegisterForm = () => {
  const initialState = {
    first: "",
    last: "",
    account: "",
    location: "",
    dob: "2000-01-01",
    password: "",
  };
  const [userInfo, setUserInfo] = useState(initialState);
  const { first, last, account, location, dob, password } = userInfo;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    const name = first + " " + last;
    const info = {
      name: name,
      account: userInfo.account,
      location: userInfo.location,
      dob: userInfo.dob,
      password: userInfo.password,
    };

    dispatch(register(info));
    console.log("Button Pressed", info);
  };

  const { auth } = useSelector((state: RootStore) => state, shallowEqual);

  const setToProfile = useCallback(() => {
    const route = `/profile/${auth.user?._id}`;
    console.log("Navigating to profile");
    navigate(route);
  }, [navigate, auth.user?._id]);

  useEffect(() => {
    if (auth.user) {
      if (auth.user._id && auth.access_token) setToProfile();
      else {
        console.log(auth.msg);
      }
    }
  }, [auth.user, auth.access_token, setToProfile, auth.msg]);

  // add wrong password notification
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="normal"
            name="first"
            value={first}
            type="text"
            label="First Name"
            variant="outlined"
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="normal"
            name="last"
            value={last}
            type="text"
            label="Last Name"
            variant="outlined"
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            margin="normal"
            name="account"
            value={account}
            type="email"
            label="Email"
            variant="outlined"
            onChange={handleChangeInput}
          />
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
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="normal"
            name="location"
            value={location}
            type="location"
            label="Location"
            variant="outlined"
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="normal"
            name="dob"
            value={dob}
            type="date"
            label="Date of Birth"
            variant="outlined"
            onChange={handleChangeInput}
          />
        </Grid>

        <Button
          type="submit"
          variant="text"
          fullWidth
          color="primary"
          disabled={first && password ? false : true}
        >
          Register
        </Button>
      </Grid>
    </Box>
  );
};

export default RegisterForm;
