import { useForm } from 'react-hook-form';
import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom'
import routes from "../../../shared/constants/routes";
import { toLogIn } from '../../../shared/apis/userAPI';
import { useNavigate } from "react-router";
import GlobalContext from "../../../shared/contexts/GlobalContext";
import { FormattedMessage} from "react-intl";

function LogIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
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

  const LogIn = async (value) => {
    const response = await toLogIn({ value });
    if (response.status === 400) {
      setError(response.data.massage);
    }
    else if (response) {
      navigate(routes.USERPAGE);
      client.name = response.data.user.name;
      client.email = response.data.user.email;
      client.role = response.data.user.role;
      client.id = response.data.user.id;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid mt={10} container direction="column" justifyContent="center" alignItems="center">
        <Box>
          <Typography variant="login"><FormattedMessage id="app.auth.login.header"/></Typography>
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
                  label={<FormattedMessage id="placeholder.email"/>}
                  helperText={errors.email && <FormattedMessage id="error.email"/>}
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
                  label={<FormattedMessage id="placeholder.password"/>}
                  helperText={errors.password && <FormattedMessage id="error.name"/>}
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
                  <FormattedMessage id="app.auth.login.button"/>
                </Button>
              </Box>
              <Box>
                <Typography ><FormattedMessage id="app.auth.login.not"/> <Link to={routes.SIGNUP}><FormattedMessage id="app.auth.login.link"/></Link></Typography>
              </Box>
            </Grid>
          </form>
        </Box>
      </Grid>
    </ThemeProvider>
  )
}

export default LogIn;