import * as React from "react";
import { Grid, Box, Paper, Typography, Divider } from "@mui/material";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import default_avatar from "../../images/default_avatar.png";

interface FriendsProps {
  friends: any;
}

const lightTheme = createTheme({ palette: { mode: "light" } });

const MyPaper = styled(Paper)({ height: 400, lineHeight: "60px" });
export default function FriendsSection(props: FriendsProps) {
  //const { sections, title } = props;

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
    <React.Fragment>
      <Grid container>
        <Grid item xs={6} sx={{ padding: 2 }}>
          <Grid
            container
            xs={12}
            sx={{ borderRadius: 6, padding: 4 }}
            component={Paper}
            elevation={3}
            square
          >
            {props.friends.map((n: any, index: number) => (
              <Grid item xs={12}>
                <Grid
                  container
                  sx={{ pb: 2, pt: 2, margin: 1, alignContent: "left" }}
                >
                  <Grid item xs={2}>
                    <img
                      style={{
                        zIndex: -5,
                        borderRadius: "75px",
                        height: "150px",
                        width: "150px",
                        objectFit: "cover",
                        backgroundSize: "cover",
                      }}
                      className="login-photo"
                      src={`https://cookingpal-pictures.s3.amazonaws.com/${n._id}/profile_pic.png`}
                      onLoad={imageOnLoadHandler}
                      onError={imageOnErrorHandler}
                      alt="error"
                    />
                  </Grid>

                  <Grid item xs={8}>
                    <Grid
                      container
                      sx={{ justifyContent: "left", textAlign: "left" }}
                    >
                      <Grid item xs={12} sx={{ pl: 10, pt: 6 }}>
                        <Typography
                          fontFamily="Helvetica"
                          fontSize={25}
                          variant="h5"
                        >
                          {n.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {index != props.friends.length - 1 ? <Divider /> : <div></div>}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={6} sx={{ padding: 2 }}>
          <Grid
            container
            xs={12}
            sx={{ borderRadius: 6, padding: 4 }}
            component={Paper}
            elevation={3}
            square
          >
            {props.friends.map((n: any, index: number) => (
              <Grid item xs={12}>
                <Grid
                  container
                  sx={{ pb: 2, pt: 2, margin: 1, alignContent: "left" }}
                >
                  <Grid item xs={2}>
                    <img
                      style={{
                        zIndex: -5,
                        borderRadius: "75px",
                        height: "150px",
                        width: "150px",
                        objectFit: "cover",
                        backgroundSize: "cover",
                      }}
                      className="login-photo"
                      src={`https://cookingpal-pictures.s3.amazonaws.com/${n._id}/profile_pic.png`}
                      onLoad={imageOnLoadHandler}
                      onError={imageOnErrorHandler}
                      alt="error"
                    />
                  </Grid>

                  <Grid item xs={8}>
                    <Grid
                      container
                      sx={{ justifyContent: "left", textAlign: "left" }}
                    >
                      <Grid item xs={12} sx={{ pl: 10, pt: 6 }}>
                        <Typography
                          fontFamily="Helvetica"
                          fontSize={25}
                          variant="h5"
                        >
                          Kachava Group
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {index != props.friends.length - 1 ? <Divider /> : <div></div>}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
