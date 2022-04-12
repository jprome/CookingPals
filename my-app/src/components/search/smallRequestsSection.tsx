import * as React from "react";
import { Grid, Box, Paper, Chip } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import PopOverUtil from "../PopOverUtil";
import ingredientIcon from "../../images/ingredient.png";
import cookingIcon from "../../images/cooking.png";
import experienceIcon from "../../images/experience.png";
import { Button, capitalize } from "@material-ui/core";
import { preProcessFile } from "typescript";

interface RequestProps {
  give: number[];
  diets: string[];
  description: string;
  budget: number;
  active: boolean;
  changeSection?(): void;
  name: string;
  // will add a true / false prop to distiguish own account against others to have changing privileges
}

const lightTheme = createTheme({ palette: { mode: "light" } });

export default function SmallRequestsSection(props: RequestProps) {
  const pics = [ingredientIcon, experienceIcon, cookingIcon];

  const iconState = [" will not ", " is willing "];

  const textIcon = [
    [
      " be sharing ingredients",
      " teach/learn cooking expertise",
      " be sharing cooking time",
    ],
    [
      " to share ingredients",
      " to teach/learn cooking expertise",
      " to share cooking time",
    ],
  ];

  return (
    <React.Fragment>
      <Grid container borderRadius={16}>
        <Grid container sx={{ borderRadius: 16 }}>
          {props.give.map((n, index) => {
            const message = props.name + iconState[n] + textIcon[n][index];
            return (
              <Grid key={`${index}${n}Grid3`} item xs={2}>
                <Button>
                  <PopOverUtil message={message}>
                    <img
                      style={{
                        zIndex: 10,
                        padding: 5,
                        opacity: 0.3 + 0.7 * n,
                        height: "100px",
                        width: "100px",
                      }}
                      alt="Error"
                      src={pics[index]}
                    />
                  </PopOverUtil>
                </Button>
              </Grid>
            );
          })}

          <Grid item xs={3}>
            <Box
              sx={{
                typography: "body1",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "left",
              }}
            >
              {props.description}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                pt: 3,
                typography: "body1",
                textAlign: "left",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {props.diets.map((n, index) => {
                return (
                  <Chip
                    variant="outlined"
                    key={`${index}${n}Button3`}
                    sx={{ mr: 1, mb: 1, fontSize: 15 }}
                    label={capitalize(n)}
                  />
                );
              })}
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
              Budget: ${props.budget}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
