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
import { addField, updateField, getAllFields } from '../../../shared/apis/fieldAPI';
import { addItem, updateItem, getItem } from '../../../shared/apis/itemAPI';
import { addTag, updateTag, removeOneTag, getAllTags} from '../../../shared/apis/tagAPI';
import GlobalContext from "../../../shared/contexts/GlobalContext";
import { useEffectOnce } from '../../../shared/functions/useEffectOnce';
import styles from './style.module.scss';
import { FormattedMessage } from "react-intl";

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
  const { adminUserId } = useContext(GlobalContext);
  const { collection } = useContext(GlobalContext);
  const { register, reset, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      tags: [{ name: '' }],
    },
  });
  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "tags"
  });
  const [optionFields, setOptionFields] = useState([]);
  const [currentOptionFields, setCurrentOptionFields] = useState([]);

  useEffectOnce(() => {
    setOptionFields(JSON.parse(collection.option_fields));
    if (currentItem) {
      getCurrentItem();
    }
  }, true);

  const getCurrentItem = async () => {
    const response = await getItem(currentItem);
    const tags = await getAllTags(currentItem);
    const fields = await getAllFields(currentItem);
    if (response) {
      let newValue = {
        name: response.name,
        item_id: response.item_id,
      }
      fields.forEach( (field) =>{
          newValue[field.name] = field.value
      })
      reset(newValue);
      replace(tags);
      setCurrentOptionFields(fields)
    }
  }

  const createOrUpdateOptionFields = async (fields, id) => {

    if (currentItem) {
      currentOptionFields.forEach(async (field) => {
        await updateField({name: field.name, value: fields[`${field.name}`], id: field.id});
      })
    }
    else {
      optionFields.forEach(async (field) => {
        let value = fields[`${field.name}`];
        if (field.type.value === 'text') {
          value = md.render(fields[`${field.name}`]);
        }
        await addField({name: field.name, value: value, item: id});
      })
    }
  }

  const createOrUpdateOptionTags = async (tags, id) => {
    if (currentItem) {
      tags.forEach(async (tag) => {
        if (tag.id) {
          await updateTag(tag);
        }
        else {
          await addTag({name: tag.name, item: currentItem});
        }   
      })
    }
    else {
      tags.forEach(async (tag) => {
        await addTag({name: tag.name, item: id});
      })
    }
  }

  const deleteTag = async (item, index) => {
    await removeOneTag(item);
    remove(index);
  }

  const createNewItem = async (values) => {    
    let data = {
      item_id: values.item_id,
      name: values.name,
      collection: collection.id
    }
    try {
      let item;
      if (currentItem) {
        item = await updateItem(data, currentItem);
      }
      else {
        item = await await addItem(data);
      }
      const fieldsData = createOrUpdateOptionFields(values, item.id);
      const tagsData = createOrUpdateOptionTags(values.tags, item.id);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      if (adminUserId) {
        navigate(routes.ADMINITEMS);
      }
      else {
        navigate(routes.ITEMS);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid mt={3} container direction="column" alignItems="flex-start">
        <Box mx={3}>
          <Typography variant="login"><FormattedMessage id="creation.item.header" /></Typography>
        </Box>
        <Box width="90%">
          <form onSubmit={handleSubmit(createNewItem)} >
            <Grid container direction="column" alignItems="flex-start" px={3}>
              <Box width="100%" my={2}>
                <TextField
                  className={styles.field}
                  variant="filled"
                  color="dark"
                  error={errors.item_id}
                  label="id"
                  helperText={errors.id &&  <FormattedMessage id="error.id" />}
                  {...register("item_id", {
                    required: true,
                    minLength: 1,
                    maxLength: 100,
                  })}
                />
              </Box>
              <Box width="100%" my={2}>
                <TextField
                  className={styles.field}
                  variant="filled"
                  color="dark"
                  error={errors.name}
                  label={<FormattedMessage id="creation.item.name" />}
                  helperText={errors.name && <FormattedMessage id="error.name" />}
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    maxLength: 100,
                  })}
                />
              </Box>

              <Box marginTop={1}>
                <Typography ><FormattedMessage id="creation.item.tags" /></Typography>
              </Box>
              {fields.map((item, index) => (
                <Box width="100%" marginBottom={1} key={item.id}>
                  <Box className={styles.boxOptionField}>
                    <TextField
                      className={styles.optionField}
                      variant="filled"
                      color="dark"
                      {...register(`tags.${index}.name`, {
                        required: true,
                        minLength: 2,
                        maxLength: 100,
                      })} />
                    <Button 
                    id={styles.deleteButton} 
                    type="button" 
                    onClick={() => (fields.length < 2) ? (null) : deleteTag(item, index)}
                    ><FormattedMessage id="creation.item.button.delete" />
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
              <Box width="20%" marginBottom={2}>
                <Button
                  id={styles.appendButton}
                  variant="outlined"
                  onClick={() => append({ tag: "" })}
                >
                  <FormattedMessage id="creation.item.button.append" />
                </Button>
              </Box>
              {optionFields.map((option) => {
                if (option.type.value === 'date' || option.type.value === 'string' || option.type.value === 'number') {
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
                else if (option.type.value === 'checkbox') {
                  return (
                    <FormCheckbox
                      register={register}
                      placeholder={option.name}
                      name={option.name}
                    />
                  )
                }
                else if (option.type.value === 'text') {
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
                <Button type="submit" variant="contained" id={styles.submitButton}>
                <FormattedMessage id="creation.item.button.submit" />
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