import * as React from "react";
import { Grid, Box, Paper, TextField, Chip, Checkbox } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import PopOverUtil from "../PopOverUtil";
import ingredientIcon from "../../images/ingredient.png";
import cookingIcon from "../../images/cooking.png";
import experienceIcon from "../../images/experience.png";
import { Button } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../utils/Typescript";

import { RequestCP } from "../../utils/Typescript";
import { updateRequest } from "../../redux/actions/userAction";

interface RequestProps {
  give: number[];
  diets: string[];
  description: string;
  budget: number;
  active: boolean;
  changeSection(): void;
}

const lightTheme = createTheme({ palette: { mode: "light" } });

const dietsList = [
  "vegan",
  "paleo",
  "low-Carb/keto",
  "vegetarian",
  "mediterranean",
  "pescetarian",
  "omnivore",
  "plant-based raw food",
  "carnivore diet",
  "lactose Intolerant",
  "gluten-free",
  "religion",
  "allergies",
  "diabetic",
];

const MyPaper = styled(Paper)({
  height: "fit-content",
  lineHeight: "60px",
  borderRadius: 20,
});
export default function EditRequestsSection(props: RequestProps) {
  const [desc, setDesc] = React.useState(props.description);
  const [giveS, setGive] = React.useState(props.give);
  const [budget, setBudget] = React.useState(props.budget);
  const [diets, setDiets] = React.useState(props.diets);
  const [active, setActive] = React.useState(props.active);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  const handleGiveChange = (index: number) => {
    const c = [...giveS];
    c[index] = (giveS[index] + 1) % 2;
    setGive(c);
  };

  const handleDietChange = (diet: string) => {
    if (diets.indexOf(diet) > -1) {
      setDiets(diets.filter((item) => item !== diet));
    } else {
      setDiets([...diets, diet]);
    }
  };

  const { auth } = useSelector((state: RootStore) => state, shallowEqual);

  const dispatch = useDispatch();

  const handleSubmitRequest = () => {
    // send request

    const request: RequestCP = {
      description: desc,
      cooking: giveS[2],
      experience: giveS[1],
      ingredient: giveS[0],
      diets: diets,
      weekly_budget: budget,
      active: active,
    };

    console.log(request);

    dispatch(updateRequest(auth, request));
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(event.target.value));
  };

  return (
    <React.Fragment>
      <Grid item xs={6} spacing={2} columnSpacing={10}>
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
              <Grid item xs={12}>
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
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                    value={desc}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ pt: 4 }}>
                <Grid container>
                  {giveS.map((n, index) => {
                    return (
                      <Grid item xs={4}>
                        <Button
                          onClick={() => {
                            handleGiveChange(index);
                          }}
                        >
                          <PopOverUtil
                            message={`You ${iconState[n]} ${textIcon[n][index]}`}
                          >
                            <img
                              key={index}
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
                  {"Diets "}
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
                  {dietsList.map((n, index) => {
                    if (diets.indexOf(n) === -1)
                      return (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleDietChange(n);
                          }}
                        >
                          {n}
                        </Button>
                      );
                    else {
                      return (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            handleDietChange(n);
                          }}
                        >
                          {n}
                        </Button>
                      );
                    }
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
                  <TextField
                    label="Weekly Budget ($)"
                    value={budget}
                    onChange={handleBudgetChange}
                    InputLabelProps={{ shrink: true }}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormat as any,
                    }}
                    prefix="$"
                  />
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
                    textAlign: "right",
                  }}
                >
                  {"Available"}

                  <PopOverUtil message="If checked your request can be found by other users">
                    <Checkbox
                      checked={active}
                      onChange={() => setActive(!active)}
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
                      <Button
                        onClick={() => {
                          handleSubmitRequest();
                          props.changeSection();
                        }}
                        variant="contained"
                      >
                        Submit Request Change
                      </Button>
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
