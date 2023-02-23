import React, { useState, useContext, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, TextField, Button, Grid, Typography, Paper, Checkbox, ListItemIcon, ListItemText, ListItemButton, ListItem, List } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import topics from '../../../shared/constants/topics';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router";
import FormSelect from "../../../common/forms/FormSelect";
import routes from "../../../shared/constants/routes";
import MarkdownIt from 'markdown-it';
import optionField from '../../../shared/constants/optionsFields';
import { addCollection, getCollection, updateCollection } from '../../../shared/apis/collectionAPI';
import { addPhoto, getPhoto, updatePhoto } from '../../../shared/apis/photoAPI';
import GlobalContext from "../../../shared/contexts/GlobalContext";
import { useEffectOnce } from '../../../shared/functions/useEffectOnce';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../shared/configs/firebaseConfig'

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

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function NewCollections() {
  const navigate = useNavigate();
  const md = new MarkdownIt();
  const { client } = useContext(GlobalContext);
  const { currentCollection, setCurrentCollection } = useContext(GlobalContext);
  const { register, setValue, reset, handleSubmit, control, formState: { errors } } = useForm();
  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "optionFields"
  });
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");

  useEffectOnce(() => {
    if (currentCollection) {
      getMyCollection();
    }
  }, true);

  const getMyCollection = async () => {
    const response = await getCollection(currentCollection);
    if (response) {
      reset({
        name: response.name,
        markdown: response.comment,
        topic: { value: response.topic, label: `${response.topic[0].toUpperCase()}${response.topic.slice(1)}` },
        option_fields: JSON.parse(response.option_fields),
        photo: response.photo,
      });
      replace(JSON.parse(response.option_fields));
    }
  }

  function handleChange(event) {
    setPhotoSrc(event.target.value);
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    const storageRef = ref(storage, `/t-collection/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percent);
      },
      (err) => console.log(err),
      async () => {
        setPhotoUrl(await getDownloadURL(uploadTask.snapshot.ref));
      }
    );
  };

  const removePhoto = () => {
    setPhotoSrc('');
    setFile('');
  }

  const addOrUpdatePhoto = async (id) => {
    let photo = '';
    try {
      if (file) {
        if (currentCollection && id) {
          photo = await updatePhoto(photoUrl, id);
        }
        else {
          photo = await addPhoto(photoUrl);
        }
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      return photo;
    }
  }

  const createNewCollection = async (values) => {
    console.log(values);
    const photo = await addOrUpdatePhoto(values.photo);
    let data = {
      ...values,
      id: currentCollection,
      markdown: md.render(values.markdown),
      topic: values.topic.value,
      option_fields: JSON.stringify(values.optionFields),
      photo: photo.id,
      author: client.id
    };
    try {
      if (currentCollection) {
        return await updateCollection(data);
      }
      else {
        return await addCollection(data);
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      navigate(routes.USERPAGE)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid mt={3} container direction="column" alignItems="flex-start">
        <Box mx={3}>
          <Typography variant="login">Collection</Typography>
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
              <Box width="100%" marginBottom={1}>
                Choose topic:
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
              <Box my={2}>
                <input type="file" onChange={handleChange} value={photoSrc} accept="/image/*" />
                <Box sx={{ width: '100%' }}>
                  <LinearProgressWithLabel color="inherit" value={progress} />
                </Box>
                <Box >
                  <Button
                    sx={{
                      ':hover': {
                        border: '1px solid #272727',
                        color: 'black'
                      },
                      border: '1px solid #272727',
                      color: 'white',
                      backgroundColor: '#272727',
                      marginRight: '4px',
                    }}
                    variant="outlined"
                    onClick={handleUpload}
                  >download image
                  </Button>
                  <Button
                    sx={{
                      ':hover': {
                        border: '1px solid #272727',
                        color: 'black'
                      },
                      border: '1px solid #272727',
                      color: 'white',
                      backgroundColor: '#272727',
                    }}
                    variant="outlined"
                    onClick={removePhoto}
                  >remove
                  </Button>
                </Box>
              </Box>
              <Box width="100%" my={2}>
                <Typography >What fields add to items? </Typography>
                {fields.map((item, index) => (
                  <Box width="100%" marginBottom={2} key={item.id}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <FormSelect
                      className="optionSelect"
                      control={control}
                      name={`optionFields.${index}.type`}
                      options={optionField}
                      rules={{ required: true }}
                    />
                    <TextField
                      sx={{ width: '40%' }}
                      label="field name"
                      variant="filled"
                      color="dark"
                      {...register(`optionFields.${index}.name`, {
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
                    }} type="button" onClick={() => remove(index)}>Delete</Button>
                  </Box>
                ))}
                <Box width="13%" >
                  <Button
                    sx={{
                      ':hover': {
                        border: '1px solid #272727',
                      },
                      border: '1px solid #272727',
                      color: 'black',
                      backgroundColor: 'white',
                      width: '100%'
                    }}
                    variant="outlined"
                    onClick={() => append({ tag: "" })}
                  >
                    add
                  </Button>
                </Box>
              </Box>
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

export default NewCollections