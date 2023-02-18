import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Grid, Typography, Paper, Checkbox, ListItemIcon, ListItemText, ListItemButton, ListItem, List } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import topics from '../../../shared/constants/topics';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router";
import FormSelect from "../../../common/forms/FormSelect";
import routes from "../../../shared/constants/routes";
import MarkdownIt from 'markdown-it';
import fields from '../../../shared/constants/optionsFields';
import { addCollection, getCollection } from '../../../shared/apis/collectionAPI';
import GlobalContext from "../../../shared/contexts/GlobalContext";
import { useEffectOnce } from '../../../common/functions/useEffectOnce';

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

function NewCollections() {
  const [checked, setChecked] = useState([]);
  const md = new MarkdownIt();
  const { client } = useContext(GlobalContext);
  const { currentCollection, setCurrentCollection } = useContext(GlobalContext);
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  useEffectOnce(() => {
    console.log(currentCollection);
    if (currentCollection) {
      getMyCollection();
    }
  }, true);

  const getMyCollection = async () => {
    const response = await getCollection(currentCollection);
    console.log(response);
    setCurrentCollection('');
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const createNewCollection = async (values) => {
    const data = {
      ...values,
      markdown: md.render(values.markdown),
      topic: values.topic.value,
      option_fields: JSON.stringify(checked),
      author: client.id
    };
    console.log(data.option_fields);
    const response = await addCollection(data);
    return response;
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
              <Box width="100%" my={2}>
                <Typography >What fields add to items?</Typography>
                <Paper sx={{ width: '100%', height: 230, overflow: 'auto' }}>
                  <List role="list" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {fields.map((field) => {
                      const labelId = `checkbox-list-label-${field.value}`;

                      return (
                        <ListItem
                          key={field.value}
                          disablePadding
                        >
                          <ListItemButton role={undefined} onClick={handleToggle(field.value)} dense>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checked.indexOf(field.value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Add ${field.labelEn}`} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
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
                  Submit
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