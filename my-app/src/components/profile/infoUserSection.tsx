import * as React from "react";
import { Grid, Box, Paper, Chip, Button, Typography } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import TranslateSharpIcon from "@mui/icons-material/TranslateSharp";
import PopOverUtil from "../PopOverUtil";
import TransgenderSharpIcon from "@mui/icons-material/TransgenderSharp";

import LocationCitySharpIcon from "@mui/icons-material/LocationCitySharp";

const MyPaper = styled(Paper)({
  height: "fit-content",
  lineHeight: "60px",
  borderRadius: 20,
});

export default function InfoUserSection(props: any) {
  return (
    <React.Fragment>
      <Grid item xs={6} columnSpacing={10}>
        <Box
          sx={{
            pl: 2,
            pr: 2,
            pb: 2,
            gap: 2,
            textAlign: "center",
          }}
        >
          <MyPaper elevation={5}>
            <Grid
              container
              borderRadius={8}
              sx={{ padding: 5, borderRadius: 8 }}
            >
              <Grid item xs={12} sx={{}}>
                <Box
                  sx={{
                    display: "flex",
                    pr: 5,
                    typography: "body1",
                    fontWeight: "bold",
                    fontSize: 25,
                    textAlign: "left",
                  }}
                >
                  <LocationCitySharpIcon fontSize="large" />
                  <Typography sx={{ fontSize: 22, pl: 1 }}>
                    Gainesville, FL, USA{" "}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    pt: 3,
                    typography: "body1",
                    textAlign: "left",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  <WorkSharpIcon fontSize="large" />
                  <Typography sx={{ fontSize: 22, pl: 1 }}>
                    College Student
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    pt: 3,
                    typography: "body1",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "left",
                  }}
                >
                  <TransgenderSharpIcon fontSize="large" />
                  <Typography sx={{ fontSize: 22, pl: 1 }}> M, 22</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    pr: 5,
                    pt: 3,
                    typography: "body1",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "left",
                  }}
                >
                  <TranslateSharpIcon fontSize="large" />
                  <Typography sx={{ fontSize: 22, pl: 1 }}>
                    English, Spanish - Learning French
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    pr: 5,
                    pt: 3,
                    typography: "body1",
                    fontWeight: "bold",
                    fontSize: 22,
                    textAlign: "left",
                  }}
                >
                  {`Member Since - `}
                  <Typography sx={{ fontSize: 22, pl: 1 }}>
                    {" "}
                    March 2020
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </MyPaper>
        </Box>

        <Box
          sx={{
            pl: 2,
            pr: 2,
            pb: 2,
            gap: 2,
            textAlign: "center",
          }}
        >
          <MyPaper elevation={5}>
            <Grid
              container
              borderRadius={8}
              sx={{ padding: 5, borderRadius: 8 }}
            >
              <Grid item xs={12} sx={{}}>
                <Box
                  sx={{
                    pr: 5,
                    typography: "body1",
                    fontWeight: "bold",
                    fontSize: 22,
                    textAlign: "left",
                  }}
                >
                  {"What's your favorite dish?"}
                  <Typography fontSize={22}>Venezuelan street sub </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    pt: 7,
                    typography: "body1",
                    textAlign: "left",
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  {"Which dishes would you like to learn?"}
                  <Typography fontSize={22}>
                    Ceviche, Chinese Fried Rice, Souvlaki
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    pt: 7,
                    typography: "body1",
                    fontWeight: "bold",
                    fontSize: 22,
                    textAlign: "left",
                  }}
                >
                  {"What is your proudest cooking moment? "}
                  <Typography fontSize={22}>
                    Cooking for a 50 people event some fire barbecue
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </MyPaper>
        </Box>
      </Grid>
    </React.Fragment>
  );
}
