import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import routes from "../../../shared/constants/routes";
import { Link, useNavigate } from 'react-router-dom';
import { toSignUp } from '../../../shared/apis/userAPI';
import GlobalContext from "../../../shared/contexts/GlobalContext";
import { FormattedMessage } from "react-intl";

function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { client } = useContext(GlobalContext);
  const [error, setError] = useState('');

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

  const SignUp = async (value) => {
    const response = await toSignUp({ value });
    if (response.status === 400) {
      setError(response.data.massage);
    }
    else if (response) {
      client.name = response.data.user.name;
      client.email = response.data.user.email;
      client.role = 'user';
      client.id = response.data.user.id;
      navigate(routes.USERPAGE);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid mt={10} container direction="column" justifyContent="center" alignItems="center">
        <Box>
          <Typography variant="login"><FormattedMessage id="app.auth.signup.header"/></Typography>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(SignUp)}>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Box my={2}>
                <TextField
                  sx={{ width: '300px' }}
                  variant="filled"
                  color="dark"
                  error={errors.name}
                  label="username"
                  helperText={errors.name && "username is too short"}
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    maxLength: 100,
                  })}
                />
              </Box>
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
              {error ? (
                <Alert sx={{ width: '270px' }} severity="error">{error}</Alert>
              ) : (null)}
              <Box my={2}>
                <Button type="submit" variant="contained" sx={{
                  ':hover': {
                    backgroundColor: '#414141',
                  },
                  color: 'white',
                  backgroundColor: '#272727',
                  width: '300px'
                }}>
                  <FormattedMessage id="app.auth.signup.button"/>
                </Button>
              </Box>
              <Box>
                <Typography ><FormattedMessage id="app.auth.signup.not"/><Link to={routes.LOGIN}><FormattedMessage id="app.auth.signup.link"/></Link></Typography>
              </Box>
            </Grid>
          </form>
        </Box>
      </Grid>
    </ThemeProvider>
  )
}

export default SignUp;