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

function NewCollections() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const md = new MarkdownIt();
  const { client } = useContext(GlobalContext);
  const { currentCollection, setCurrentCollection } = useContext(GlobalContext);
  const { register, reset, handleSubmit, control, formState: { errors } } = useForm();
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
      setChecked(JSON.parse(response.option_fields));
      reset({
        name: response.name,
        markdown: response.comment,
        topic: { value: response.topic, label: `${response.topic[0].toUpperCase()}${response.topic.slice(1)}` }
      });
    }
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

  function handleChange(event) {
    setPhotoSrc(event.target.value);
    setFile(event.target.files[0]);
    handleUpload();
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

  const createNewCollection = async (values) => {
    let photo = '';
    if (file) {
      if (currentCollection) {
        photo = await updatePhoto(photoUrl);
      }
      else {
        photo = await addPhoto(photoUrl);
      }
    }
    let data = {
      ...values,
      id: currentCollection,
      markdown: md.render(values.markdown),
      topic: values.topic.value,
      option_fields: JSON.stringify(checked),
      photo: photo.id,
      author: client.id
    };
    // try {
    //   if (currentCollection) {
    //     return await updateCollection(data);
    //   }
    //   else {
    //     return await addCollection(data);
    //   }
    // }
    // catch (err) {
    //   console.log(err);
    // }
    // finally {
    //   navigate(routes.USERPAGE)
    // }
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
              <Box my={2}>
                <input type="file" onChange={handleChange} value={photoSrc} accept="/image/*" />
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
                >remove</Button>
              </Box>
              <Box width="100%" my={2}>
                <Typography >What fields add to items? </Typography>
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