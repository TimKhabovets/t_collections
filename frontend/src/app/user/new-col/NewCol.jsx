import React, { useState }from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Grid, Typography} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import routes from "../../../shared/constants/routes";
import Markdown from 'markdown-to-jsx';

function NewCollections() {
    const [markdown, setMarkdown] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const createNewCollection = () => {
    return;
  }

  return (
    <ThemeProvider theme={theme}>
    <Grid mt={3} container direction="column" alignItems="flex-start">
      <Box mx={3}>
        <Typography variant="login">New Collection</Typography>
      </Box>
      <Box width="90%"> 
        <form onSubmit={handleSubmit(createNewCollection)} >
          <Grid container direction="column" alignItems="flex-start" px={3}>
          <Box width="100%" my={2}> 
            <TextField
              sx={{width: '100%'}}
              variant="filled"
              color="dark"
              error={errors.name}
              label="name"
              helperText={errors.name && "name is too short"}
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 100,
            })}
            />
          </Box>
          <Box width="100%">
            <textarea className='' {...register("markdown", {required: true, min: 5})} />
          </Box>
          <Box width="30%"  my={2}>
            <Button type="submit" variant="contained"  sx={{ 
                ':hover': {
                    backgroundColor: '#414141',
                  },
                color: 'white', 
                backgroundColor: '#272727',
                width: '100%'
              }}>
              Sign Up
            </Button>
          </Box>
          </Grid>  
        </form>
      </Box>
    </Grid>
    </ThemeProvider>
  )
}

export default NewCollections