import { Grid, Typography, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RegisterForm from "../components/registerFrom";

const theme = createTheme();

const Register = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" style={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            style={{
              position: "fixed",
              zIndex: -5,
              height: "100%",
              width: "60%",
            }}
            className="login-photo"
            src={require("../images/01.jpg")}
            alt={"login"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={12}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "90vh",
            }}
          >
            <Grid item>
              <Typography variant="h4">Login to your account</Typography>
            </Grid>
            <Grid item>
              <RegisterForm />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Have an account? <Link to="/login"> Log in</Link>
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
