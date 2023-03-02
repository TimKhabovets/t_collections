import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Grid, Typography} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import routes from "../../../shared/constants/routes";
import { Link, useNavigate } from 'react-router-dom';
import { toSignUp } from '../../../shared/apis/userAPI';
import GlobalContext from "../../../shared/contexts/GlobalContext";

function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
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

  const SignUp = async (value) => {
    const response = await toSignUp({ value });
    if(response) {
      client.name = response.user.name;
      client.email = response.user.email;
      client.role = 'user';
      client.id = response.user.id;
      navigate(routes.USERPAGE);
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
    <Grid mt={10} container direction="column" justifyContent="center" alignItems="center">
      <Box>
        <Typography variant="login">Sign Up</Typography>
      </Box>
      <Box> 
        <form onSubmit={handleSubmit(SignUp)}>
          <Grid container direction="column" alignItems="center" justifyContent="center">
          <Box my={2}> 
            <TextField
              sx={{width: '300px'}}
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
              sx={{width: '300px'}}
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
              sx={{width: '300px'}}            
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
            <Button type="submit" variant="contained"  sx={{ 
                ':hover': {
                    backgroundColor: '#414141',
                  },
                color: 'white', 
                backgroundColor: '#272727',
                width: '300px'
              }}>
              Sign Up
            </Button>
          </Box>
          <Box>
            <Typography >Already have an account?<Link to={routes.LOGIN}>Login here</Link></Typography>
          </Box>
          </Grid>  
        </form>
      </Box>
    </Grid>
    </ThemeProvider>
  )
}

export default SignUp;