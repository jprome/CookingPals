//import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendFriendRequest } from "../redux/actions/userAction";
import { FormSubmit, InputChange, RootStore } from "../utils/Typescript";
//import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const SendFriendRequest = () => {
  const initialState = { request: "" };
  const [requestInfo, setUserLogin] = useState(initialState);
  const { request } = requestInfo;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...requestInfo, [name]: value });
  };
  const handleRatingChange = (n: number) => {
    setUserLogin({ ...requestInfo });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    const friend_request = { friend_id: profile._id };

    dispatch(sendFriendRequest(auth, friend_request));
    navigate(`/profile/${profile._id}`);
  };

  const { auth } = useSelector((state: RootStore) => state, shallowEqual);
  const { profile } = useSelector((state: RootStore) => state, shallowEqual);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <Grid item xs={12}>
          <Box
            sx={{
              my: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Typography variant="h4">Picture</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">Friend Request</Typography>
            </Grid>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    margin="normal"
                    name="request"
                    value={request}
                    type="request"
                    label="Message"
                    variant="outlined"
                    onChange={handleChangeInput}
                  />
                </Grid>

                <Button type="submit" variant="text" fullWidth color="primary">
                  Send Friend Request
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SendFriendRequest;
