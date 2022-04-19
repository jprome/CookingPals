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

  const imageOnLoadHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.log(
      `The image with url of ${event.currentTarget.src} has been loaded`
    );
  };

  // This function is triggered if an error occurs while loading an image
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = default_avatar;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: 2 }}>
        <MyPaper elevation={5} sx={{ p: 3 }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={3}
              sx={{
                alignContent: "center",
                textAlign: "center",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button onClick={() => navigate(`/profile/${props.user._id}`)}>
                <div>
                  <img
                    style={{
                      borderRadius: "90px",
                      height: "180px",
                      width: "180px",
                      alignContent: "center",
                      textAlign: "center",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      objectFit: "cover",
                      backgroundSize: "cover",
                    }}
                    src={`https://cookingpal-pictures.s3.amazonaws.com/${props.user._id}/profile_pic.png`}
                    onLoad={imageOnLoadHandler}
                    onError={imageOnErrorHandler}
                    alt="error"
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
