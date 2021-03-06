import React, { useState } from "react";
import { Button, Chip, Grid, Paper } from "@mui/material";
import {
  Cookbook,
  FormSubmit,
  InputChange,
  RootStore,
} from "../../utils/Typescript";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import imageBack from "../../images/01.jpg";
import imageBackCookbook from "../../images/cookbook_icon.png";
import ButtonBase from "@mui/material/ButtonBase";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createCookbook } from "../../redux/actions/userAction";
import { convertToObject } from "typescript";

interface RecipesProps {
  cookbooks: Cookbook[];
  own: boolean;
}

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

const lightTheme = createTheme({ palette: { mode: "light" } });

const MyPaper = styled(Paper)({ height: 180, lineHeight: "60px" });
export default function RecipesSection(props: RecipesProps) {
  //const { sections, title } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const initialState = {
    title: "",
    description: "",
    avatar: [] as any,
    diets: [] as string[],
    fileChanged: false,
  };
  const [cookbookInput, setInput] = useState(initialState);
  const { title, description } = cookbookInput;

  const { auth } = useSelector((state: RootStore) => state, shallowEqual);

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setInput({ ...cookbookInput, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = (event: any) => {
    hiddenFileInput!.current!.click();
  };

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      setInput({ ...cookbookInput, avatar: file, fileChanged: true });
      console.log(file);

      //setUser({ ...user, avatar: file });
    }
  };

  const handleDietChange = (diet: string) => {
    if (cookbookInput.diets.indexOf(diet) > -1) {
      setInput({
        ...cookbookInput,
        diets: cookbookInput.diets.filter((item) => item !== diet),
      });
    } else {
      setInput({ ...cookbookInput, diets: [...cookbookInput.diets, diet] });
    }
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    const request = {
      diet_filters: [],
      title: title,
      description: description,
      recipes: [],
      cover_pic: "",
    };
    dispatch(createCookbook(auth, request));
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={lightTheme}>
        <Grid
          item
          xs={12}
          sx={{ borderRadius: 4, mt: 5 }}
          //sm={8}
          //md={5}
          component={Paper}
          elevation={5}
          square
        >
          <Grid container spacing={2}>
            {[lightTheme].map((theme, index) => (
              <Grid item xs={12} key={index} columnSpacing={10}>
                <ThemeProvider theme={theme}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "background.default",
                      display: "grid",
                      gridTemplateColumns: { md: "1fr 1fr" },
                      gap: 2,
                      textAlign: "center",
                    }}
                  >
                    {props.cookbooks.map((n: any) => {
                      return (
                        <React.Fragment key={`${n.title}Cookboks`}>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              minWidth: 300,
                              width: "100%",
                            }}
                          >
                            <ImageButton
                              focusRipple
                              key={n}
                              style={{
                                width: 700,
                              }}
                              onClick={() => navigate(`cookbook/${n._id}`)}
                            >
                              <ImageSrc
                                style={{ backgroundImage: `url(${imageBack})` }}
                              />
                              <ImageBackdrop className="MuiImageBackdrop-root" />
                              <Image>
                                <Typography
                                  component="span"
                                  variant="subtitle1"
                                  color="inherit"
                                  sx={{
                                    position: "relative",
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) =>
                                      `calc(${theme.spacing(1)} + 6px)`,
                                  }}
                                >
                                  {n.title}
                                  <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                              </Image>
                            </ImageButton>
                          </Box>
                        </React.Fragment>
                      );
                    })}
                    {props.own ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          minWidth: 300,
                          width: "100%",
                        }}
                      >
                        <ImageButton
                          focusRipple
                          key={"addNewCookbook"}
                          style={{ width: 750 }}
                          onClick={handleClickOpen}
                        >
                          <ImageSrcNew
                            style={{
                              backgroundImage: `url(${imageBackCookbook})`,
                            }}
                          />
                          <ImageBackdrop className="MuiImageBackdrop-root" />

                          <Image>
                            <Typography
                              component="span"
                              variant="subtitle1"
                              color="inherit"
                              sx={{
                                position: "relative",
                                p: 4,
                                pt: 2,
                                pb: (theme) =>
                                  `calc(${theme.spacing(1)} + 6px)`,
                              }}
                            >
                              {"Create New Cookbook"}
                              <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                          </Image>
                        </ImageButton>
                        <Dialog
                          fullWidth={true}
                          maxWidth="lg"
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="form-dialog-title"
                        >
                          <form onSubmit={handleSubmit}>
                            <DialogTitle id="form-dialog-title">
                              Create New Cookbook
                            </DialogTitle>

                            <DialogContent>
                              <DialogContentText></DialogContentText>
                              <Grid container>
                                <Grid item xs={12}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    name="title"
                                    value={title}
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    onChange={handleChangeInput}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    name="description"
                                    value={description}
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    onChange={handleChangeInput}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Button
                                    sx={{}}
                                    onClick={handleClick}
                                    color="primary"
                                  >
                                    Upload Cover Picture
                                  </Button>
                                  <Chip
                                    variant="outlined"
                                    sx={{ mr: 1, mb: 1, fontSize: 15 }}
                                    label={
                                      cookbookInput.fileChanged ? (
                                        <div>{cookbookInput.avatar.name}</div>
                                      ) : (
                                        <div>No Image Found</div>
                                      )
                                    }
                                  />

                                  <span>
                                    <input
                                      type="file"
                                      ref={hiddenFileInput}
                                      onChange={handleChangeFile}
                                      style={{ display: "none" }}
                                    />
                                  </span>
                                </Grid>
                                <Grid item xs={12}>
                                  {cookbookInput.fileChanged ? (
                                    <img
                                      style={{
                                        objectFit: "cover",
                                        backgroundSize: "cover",
                                        height: "300px",
                                        width: "750px",
                                        borderRadius: "20px",
                                      }}
                                      src={URL.createObjectURL(
                                        cookbookInput.avatar
                                      )}
                                      alt="avatar"
                                    />
                                  ) : (
                                    <div></div>
                                  )}
                                </Grid>
                                <Grid item xs={12}>
                                  <Box
                                    sx={{
                                      pt: 3,
                                      typography: "body1",
                                      textAlign: "left",
                                    }}
                                  >
                                    {"Diets: "}
                                    {dietsList.map((n, index) => {
                                      if (cookbookInput.diets.indexOf(n) === -1)
                                        return (
                                          <Button
                                            key={`${n}Button1`}
                                            variant="outlined"
                                            color="secondary"
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
                                            key={`${n}Button2`}
                                            variant="contained"
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
                              </Grid>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                onClick={handleClose}
                                color="primary"
                              >
                                Create Cookbook
                              </Button>
                            </DialogActions>
                          </form>
                        </Dialog>
                      </Box>
                    ) : (
                      <div></div>
                    )}
                  </Box>
                </ThemeProvider>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}

const images = [
  {
    url: imageBack,
    title: "Breakfast",
    width: "40%",
  },
  {
    url: imageBack,
    title: "Burgers",
    width: "30%",
  },
  {
    url: imageBack,
    title: "Camera",
    width: "30%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 300,
  borderRadius: "75px",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 10%",
  borderRadius: "20px",
  backgroundRepeat: "no-repeat",
});

const ImageSrcNew = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "contain",
  backgroundPosition: "center 10%",
  borderRadius: "20px",
  backgroundRepeat: "no-repeat",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
  borderRadius: "20px",
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));
