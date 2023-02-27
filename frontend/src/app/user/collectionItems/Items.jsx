import React, { useContext, useState } from 'react';
import parse from 'html-react-parser';
import styles from './style.module.scss';
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
import { removeTag, getAllTags } from '../../../shared/apis/tagAPI';
import { removeField, getAllFields } from '../../../shared/apis/fieldAPI';
import { getPhoto } from '../../../shared/apis/photoAPI';
import Item from '../item/Item';

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
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = useState({});
  const [itemOptionFields, setItemOptionFields] = useState([]);
  const [itemTags, setItemTags] = useState([]);

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

  const deleteItem = (id) => {
    removeItem(id);
    getAllCollectionItems();
  }

  const toNewItem = () => {
    setCurrentItem('');
    navigate(routes.CREATEITEM)
  }

  const openItem = async (item) => {
    setItem(item);
    setItemOptionFields(await getAllFields(item.id));
    setItemTags(await getAllTags(item.id));
    setOpen(true);
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" direction="column" alignItems="center">
        <Grid paddingLeft={4} marginTop={1} container direction="column">
          <Item
            open={open}
            setOpen={setOpen}
            item={item}
            optionFields={itemOptionFields}
            tags={itemTags}
          />
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
          <Button onClick={toNewItem} variant="outlined" id={styles.button}>
            Add New Item
          </Button>
        </Box>

        {isLoading ? (
          <Box >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <TableContainer className={styles.table} component={Paper}>
            <Table aria-label="customized table">
              <TableBody>
                {items.map((item) => {
                  return (
                    <StyledTableRow kay={item.id}>
                      <StyledTableCell className={styles.tableRow} component="th" scope="row" onClick={() => { openItem(item) }}>
                        <AutoAwesomeMotionIcon />
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                          <Button
                            onClick={() => { editItem(item.id) }}
                            id={styles.tableButton}
                          >edit</Button>
                          <Button
                            onClick={() => { deleteItem(item.id) }}
                            id={styles.tableButton}
                          >delete</Button>
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