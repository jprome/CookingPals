import React, { MouseEvent, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Grid, Container, Typography, Box, Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
//import CssBaseline from '@mui/material/CssBaseline';
import Button from "@material-ui/core/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import SmallRequestsSection from "./smallRequestsSection";

import { IUser, RootStore } from "../../utils/Typescript";
import default_avatar from "../../images/default_avatar.png";

const theme = createTheme();
const MyPaper = styled(Paper)({
  height: "fit-content",
  lineHeight: "60px",
  borderRadius: 16,
});

interface profileCardProps {
  user: IUser;
}

const ProfileCards = () => {
  const { searchRequest } = useSelector(
    (state: RootStore) => state,
    shallowEqual
  );

  return (
    <div>
      {searchRequest.msg != "successfull" ? (
        <div>
          <Button>Complete Search Request {searchRequest.msg}</Button>
        </div>
      ) : (
        <div>
          <Grid container alignContent="center" textAlign="center">
            {searchRequest.users!.map((user) => {
              return (
                <Grid item key={`${user._id}Grid4`} xs={12}>
                  <ProfileCard user={user}></ProfileCard>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ProfileCards;

export const ProfileCard = (props: profileCardProps) => {
  let navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: 2 }}>
        <MyPaper elevation={5} sx={{ p: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={3} sx={{}}>
              <Button onClick={() => navigate(`/profile/${props.user._id}`)}>
                <div>
                  <img
                    style={{
                      borderRadius: "100px",
                      height: "200px",
                      width: "200px",
                      alignContent: "center",
                      textAlign: "center",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={
                      props.user.picture
                        ? props.user.picture.length > 1
                          ? props.user.picture
                          : "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                        : "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                    }
                    alt="avatar"
                  />
                </div>
              </Button>
              <Typography
                sx={{ alignContent: "center", textAlign: "center" }}
                variant="h4"
              >
                {props.user.name}
              </Typography>
            </Grid>

            <Grid item xs={9} sx={{ pb: 5 }}>
              <SmallRequestsSection
                name={props.user.name!}
                description={props.user.request!.description}
                give={[
                  props.user.request!.ingredient,
                  props.user.request!.experience,
                  props.user.request!.cooking,
                ]}
                diets={props.user.request!.diets}
                budget={props.user.request!.weekly_budget}
                active={props.user.request!.active}
              />
            </Grid>
          </Grid>
        </MyPaper>
      </Box>
    </ThemeProvider>
  );
};
