import React, { useState, useContext } from 'react';
import { useForm, useFieldArray} from "react-hook-form";
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router";
import FormInput from "../../../common/forms/FormInput";
import FormCheckbox from "../../../common/forms/FormCheckbox";
import FormText from "../../../common/forms/FormText";
import routes from "../../../shared/constants/routes";
import MarkdownIt from 'markdown-it';
import { addField, updateField, removeField } from '../../../shared/apis/fieldAPI'
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
  const [optionFields, setOptionFields] = useState([])

  useEffectOnce(() => {
    setOptionFields(JSON.parse(collection.option_fields));
    if (currentItem) {
      getCurrentItem();
    }
  }, true);

  const getCurrentItem = async () => {
    // const response = await getCollection(currentItem);
    // if (response) {

    // }
  }

  const createNewItem = async (values) => {
    console.log(collection);
    console.log(optionFields);
    // if (currentItem) {
    //   values.optionFields.forEach(async (field) => {
    //     await updateField(field);
    //   })
    // }
    // else {
    //   values.optionFields.forEach(async (field) => {
    //     await addField(field);
    //   })
    // }
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
                <Box width="100%" marginBottom={2} key={item.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField
                      sx={{ width: '82%' }}
                      variant="filled"
                      color="dark"
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
                    }} type="button" onClick={() => (fields.length < 2) ? (null) : remove(index)}
                    >Delete
                    </Button>
                  </Box>
                  <ErrorMessage
                    errors={errors}
                    name={`tags.${index}.tag`}
                    message="add tag"
                    render={({ message }) => <p className='error'>{message}</p>}
                  />
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

              {optionFields.map((option) => {
                if (option.type.value === 'd' || option.type.value === 's' || option.type.value === 'n') {
                  return (
                    <FormInput
                      register={register}
                      type={option.type.label}
                      errors={errors}
                      placeholder={option.name}
                      name={option.name}
                    />
                  )
                }
                else if (option.type.value === 'c') {
                  return (
                    <FormCheckbox
                      register={register}
                      placeholder={option.name}
                      name={option.name}
                    />
                  )
                }
                else if (option.type.value === 't') {
                  return (
                    <FormText
                      errors={errors}
                      register={register}
                      placeholder={option.name}
                      name={option.name}
                    />
                  )
                }
              })}

              <Box width="30%" marginTop={2} marginBottom={7}>
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