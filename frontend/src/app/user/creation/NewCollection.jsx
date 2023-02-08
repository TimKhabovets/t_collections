import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import topics from '../../../shared/constants/topics';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router";
import FormSelect from "../../../common/forms/FormSelect";
import routes from "../../../shared/constants/routes";
import Markdown from 'markdown-to-jsx';

function NewCollections() {
  const [markdown, setMarkdown] = useState();
  const { register, handleSubmit, control, formState: { errors } } = useForm();

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

  const createNewCollection = (values) => {
    setMarkdown(<Markdown>
      values.markdown
    </Markdown>);
    const data = {
      ...values,
      markdown : markdown,
      topic : values.topic.value,
    };
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
                  sx={{ width: '100%' }}
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
              <Box width="100%" my={2}>
                <textarea className='comment' placeholder="something about this collection" {...register("markdown", { required: true, minLength: 7 })} />
                <ErrorMessage 
                  errors={errors} 
                  name="markdown" 
                  message="comment is too short" 
                  render={({ message }) => <p className='error'>{message}</p>}
                />
              </Box>
              <Box width="100%" my={2}>
                <FormSelect
                  control={control}
                  name="topic"
                  options={topics}
                  rules={{ required: true }}
                />
                <ErrorMessage 
                  errors={errors} 
                  name="topic" 
                  message="choose a topic" 
                  render={({ message }) => <p className='error'>{message}</p>}
                />
              </Box>
              <Box width="30%" my={2}>
                <Button type="submit" variant="contained" sx={{
                  ':hover': {
                    backgroundColor: '#414141',
                  },
                  color: 'white',
                  backgroundColor: '#272727',
                  width: '100%'
                }}>
                  Add new collection
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