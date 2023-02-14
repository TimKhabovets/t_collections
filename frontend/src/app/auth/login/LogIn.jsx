import { useForm } from 'react-hook-form';
import React, {useContext} from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import routes from "../../../shared/constants/routes";
import { toLogIn } from '../../../shared/apis/userAPI';
import { useNavigate } from "react-router";
import GlobalContext from "../../../shared/contexts/GlobalContext";

function LogIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  const { client } = useContext(GlobalContext);

  const theme = createTheme({
    palette: {
      dark: {
        main: '#212121',
      },
    },
    typography: {
      login: {
        fontSize: 40,
        fontWeight: 800,

      },
    }
  });

  const LogIn = async (value) => {
    const response = await toLogIn({ value });
    if(response) {
      navigate(routes.USERPAGE);
      client.name = response.user.name;
      client.email = response.user.email;
      client.role = response.user.role;
      client.id = response.user.id;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid mt={10} container direction="column" justifyContent="center" alignItems="center">
        <Box>
          <Typography variant="login">Log In</Typography>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(LogIn)}>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Box my={2}>
                <TextField
                  type="email"
                  sx={{ width: '300px' }}
                  variant="filled"
                  color="dark"
                  error={errors.email}
                  label="email"
                  helperText={errors.email && "email is not correct"}
                  {...register("email", {
                    required: true,
                    minLength: 5,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                    }
                  })}
                />
              </Box>
              <Box my={2}>
                <TextField
                  type="password"
                  sx={{ width: '300px' }}
                  variant="filled"
                  color="dark"
                  error={errors.password}
                  label="password"
                  helperText={errors.password && "password is too short"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                />
              </Box>
              <Box my={2}>
                <Button type="submit" variant="contained" sx={{
                  ':hover': {
                    backgroundColor: '#414141',
                  },
                  color: 'white',
                  backgroundColor: '#272727',
                  width: '300px'
                }}>
                  Log In
                </Button>
              </Box>
              <Box>
                <Typography >Not registered? <Link to={routes.SIGNUP}>Create on account</Link></Typography>
              </Box>
            </Grid>
          </form>
        </Box>
      </Grid>
    </ThemeProvider>
  )
}

export default LogIn;