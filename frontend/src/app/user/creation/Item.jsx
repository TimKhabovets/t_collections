import React, { useState, useContext } from 'react';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Box, TextField, Button, Grid, Typography, Paper, Checkbox, ListItemIcon, ListItemText, ListItemButton, ListItem, List } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router";
import FormDate from "../../../common/forms/FormDate";
import FormString from "../../../common/forms/FormString";
import FormCheckbox from "../../../common/forms/FormCheckbox";
import FormNumber from "../../../common/forms/FormNumber";
import FormText from "../../../common/forms/FormText";
import routes from "../../../shared/constants/routes";
import MarkdownIt from 'markdown-it';
import fields from '../../../shared/constants/optionsFields';
import { addCollection, getCollection, updateCollection } from '../../../shared/apis/collectionAPI';
import GlobalContext from "../../../shared/contexts/GlobalContext";
import { useEffectOnce } from '../../../shared/functions/useEffectOnce';

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

function NewItem() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const md = new MarkdownIt();
  const { currentItem, setCurrentItem } = useContext(GlobalContext);
  const { collection } = useContext(GlobalContext);
  const { register, reset, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      tags: [{ tag: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags"
  });

  useEffectOnce(() => {
    if (currentItem) {
      getCurrentItem();
    }
  }, true);

  const getCurrentItem = async () => {
    // const response = await getCollection(currentItem);
    // if (response) {

    // }
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

  const createNewItem = async (values) => {

  }

  return (
    <ThemeProvider theme={theme}>
      <Grid mt={3} container direction="column" alignItems="flex-start">
        <Box mx={3}>
          <Typography variant="login">Item</Typography>
        </Box>
        <Box width="90%">
          <form onSubmit={handleSubmit(createNewItem)} >
            <Grid container direction="column" alignItems="flex-start" px={3}>
              <Box width="100%" my={2}>
                <TextField
                  sx={{ width: '100%' }}
                  variant="filled"
                  color="dark"
                  error={errors.id}
                  label="id"
                  helperText={errors.id && "id is too short"}
                  {...register("id", {
                    required: true,
                    minLength: 1,
                    maxLength: 100,
                  })}
                />
              </Box>
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
              <Box marginTop={1}>
                <Typography >Tags:</Typography>
              </Box>
              {fields.map((item, index) => (
                <Box width="100%" marginBottom={2} key={item.id}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TextField
                    sx={{ width: '82%' }}
                    variant="filled"
                    color="dark"
                    error={errors.tags}
                    {...register(`tags.${index}.tag`, {
                      required: true,
                      minLength: 2,
                      maxLength: 100,
                    })} />
                  <Button sx={{
                    ':hover': {
                      backgroundColor: '#414141',
                    },
                    backgroundColor: '#272727',
                    border: '1px solid #272727',
                    color: 'white',
                    width: '17%',
                  }} type="button" onClick={() => (fields.length < 2) ? (null) : remove(index)}>Delete</Button>
                </Box>
              ))}
              <Box width="20%" >
                <Button
                  sx={{
                    ':hover': {
                      border: '1px solid #272727',
                    },
                    border: '1px solid #272727',
                    color: 'black',
                    backgroundColor: 'white',
                  }}
                  variant="outlined"
                  onClick={() => append({ tag: "" })}
                >
                  append
                </Button>
              </Box>
              <FormDate errors={errors} register={register} name='d'/>
              <FormString errors={errors} register={register} name='s'/>
              <FormCheckbox register={register} name='c'/>
              <FormNumber errors={errors} register={register} name='n'/>
              <FormText errors={errors} register={register} name='t'/>
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

export default NewItem;