import React, { useContext, useState } from 'react';
import parse from 'html-react-parser';
import { useNavigate } from "react-router";
import GlobalContext from "../../../shared/contexts/GlobalContext";
import routes from '../../../shared/constants/routes';

import { Box, Button, Grid, Paper, TableContainer, Typography, Table, TableBody, ButtonGroup } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import { useEffectOnce } from '../../../shared/functions/useEffectOnce';
import { getAllItems, removeItem } from '../../../shared/apis/itemAPI';
import { removeTag } from '../../../shared/apis/tagAPI';
import { removeField } from '../../../shared/apis/fieldAPI';
import { getPhoto } from '../../../shared/apis/photoAPI';

const theme = createTheme({
  palette: {
    dark: {
      main: '#212121',
    },
  },
  typography: {
    name: {
      fontSize: 45,
      fontWeight: 800,
    },
    topic: {
      fontSize: 30,
      fontWeight: 400,
    },
    comment: {
      fontSize: 20,
    },
  }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Items() {
  let navigate = useNavigate();
  const { collection } = useContext(GlobalContext);
  const { currentItem, setCurrentItem } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [imgUrl, setImgUrl] = useState();

  useEffectOnce(() => {
    if (collection) {
      getAllCollectionItems();
      if (collection.photo) {
        getCollectionPhoto();
      }
    }
  }, true);

  const getAllCollectionItems = async () => {
    setIsLoading(true);
    try {
      let response = await getAllItems(collection.id);
      setItems(response);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const getCollectionPhoto = async () => {
    const photo = await getPhoto(collection.photo);
    console.log(photo);
    setImgUrl(photo.url);
  }

  const editItem = (id) => {
    setCurrentItem(id);
    navigate(routes.CREATEITEM)
  }

  const deleteItem = async (id) => {
    const tagData = await removeTag(id);
    const fieldData = await removeField(id);
    const itemData = await removeItem(id);
    getAllCollectionItems();
  }

  const toNewItem = () => {
    setCurrentItem('');
    navigate(routes.CREATEITEM)
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" direction="column" alignItems="center">
        <Grid paddingLeft={4} marginTop={1} container direction="column">
          <Typography variant="name">{collection.name}</Typography>
          <Box my={1} >
            {collection.photo ? (
              <img className='collectionImg' src={imgUrl} alt="collection photo" />
            ) : (
              <></>
            )}
          </Box>
          <Typography variant="topic">{collection.topic[0].toUpperCase()}{collection.topic.slice(1)}</Typography>
          <Typography variant="comment">{parse(collection.comment)}</Typography>
        </Grid>
        <Box my={2} width='80%'>
          <Button onClick={toNewItem} variant="outlined" sx={{
            ':hover': {
              backgroundColor: '#272727',
              border: '1px solid #272727',
              color: 'white',
            },
            border: '1px solid #272727',
            color: '#272727',
            backgroundColor: 'white',
            width: '100%',
          }}>
            Add New Item
          </Button>
        </Box>
        {isLoading ? (
          <Box >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <TableContainer sx={{ minWidth: 500, maxWidth: '95%' }} component={Paper}>
            <Table aria-label="customized table">
              <TableBody>
                {items.map((item) => {
                  return (
                    <StyledTableRow kay={item.id}>
                      <StyledTableCell sx={{ width: 20 }} component="th" scope="row">
                        <AutoAwesomeMotionIcon />
                      </StyledTableCell>
                      <StyledTableCell align="left" >
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                          <Button
                            onClick={() => { editItem(item.id) }}
                            sx={{
                              ':hover': {
                                backgroundColor: '#272727',
                                border: '1px solid #272727',
                                color: 'white',
                              },
                              border: '1px solid #272727',
                              color: '#272727',
                              backgroundColor: 'white',
                            }}>edit</Button>
                          <Button
                            onClick={() => { deleteItem(item.id) }}
                            sx={{
                              ':hover': {
                                backgroundColor: '#272727',
                                border: '1px solid #272727',
                                color: 'white',
                              },
                              border: '1px solid #272727',
                              color: '#272727',
                              backgroundColor: 'white',
                            }}>delete</Button>
                        </ButtonGroup>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </ThemeProvider>
  )
}

export default Items