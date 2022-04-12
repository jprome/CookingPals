import * as React from "react";
import { Grid, Box, Paper, Chip, Checkbox } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import PopOverUtil from "../PopOverUtil";
import ingredientIcon from "../../images/ingredient.png";
import cookingIcon from "../../images/cooking.png";
import experienceIcon from "../../images/experience.png";
import { Button } from "@material-ui/core";
import { capitalize } from "@material-ui/core";
import Switch from "@mui/material/Switch";
import { preProcessFile } from "typescript";

interface RequestProps {
  give: number[];
  diets: string[];
  description: string;
  budget: number;
  active: boolean;
  changeSection?(): void;
  own: boolean;
  name: string;
}

const lightTheme = createTheme({ palette: { mode: "light" } });

const MyPaper = styled(Paper)({
  height: "fit-content",
  lineHeight: "60px",
  borderRadius: 20,
});

export default function RequestsSection(props: RequestProps) {
  const pics = [ingredientIcon, experienceIcon, cookingIcon];

  const iconState = ["will not", " are willing"];

  const textIcon = [
    [
      "be sharing ingredients",
      "teach/learn cooking expertise",
      "be sharing cooking time",
    ],
    [
      "to share ingredients",
      "to teach/learn cooking expertise",
      "to share cooking time",
    ],
  ];

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
              <Grid item xs={12} sx={{ pt: 5 }}>
                <Box
                  sx={{
                    display: "flex",
                    pr: 5,
                    typography: "body1",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "left",
                  }}
                >
                  {props.description}
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ pt: 5 }}>
                <Grid container>
                  {props.give.map((n, index) => {
                    return (
                      <Grid key={`${index}Grid5`} item xs={4}>
                        <Button>
                          <PopOverUtil
                            message={`You ${iconState[n]} ${textIcon[n][index]}`}
                          >
                            <img
                              style={{
                                //position:"fixed",
                                zIndex: 10,
                                padding: 2,
                                opacity: 0.3 + 0.7 * n,
                                height: "130px",
                                width: "130px",
                              }}
                              alt="Error"
                              src={pics[index]}
                            />
                          </PopOverUtil>
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
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
                        size="medium"
                        sx={{ mr: 1, mb: 1, fontSize: 15 }}
                        label={capitalize(n)}
                        key={`${index}Button5`}
                      />
                    );
                  })}
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box
                  sx={{
                    display: "flex",
                    pt: 3,
                    typography: "body1",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "left",
                    pr: 2,
                  }}
                >
                  Budget ${props.budget}
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
                    pr: 10,
                  }}
                >
                  Availability
                  <PopOverUtil message="If checked your request can be found by other users">
                    <Checkbox
                      sx={{ pl: 10, pt: 10 }}
                      checked={props.active}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </PopOverUtil>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    pr: 5,
                    pt: 3,
                    pb: 5,
                    typography: "body1",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "left",
                  }}
                >
                  <Grid
                    container
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Grid item>
                      {props.changeSection && props.own ? (
                        <Button
                          onClick={() => {
                            if (props.changeSection) {
                              props.changeSection();
                            }
                          }}
                          variant="contained"
                        >
                          Edit Request
                        </Button>
                      ) : (
                        <div></div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </MyPaper>
        </Box>
      </Grid>
    </React.Fragment>
  );
}
