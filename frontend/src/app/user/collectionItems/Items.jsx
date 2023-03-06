import React, { useContext, useState } from 'react';
import parse from 'html-react-parser';
import styles from './style.module.scss';
import { useNavigate } from "react-router";
import routes from '../../../shared/constants/routes';

import { Box, Button, Grid, Typography, ButtonGroup } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

import { useEffectOnce } from '../../../shared/functions/useEffectOnce';
import { getAllItems, removeItem } from '../../../shared/apis/itemAPI';
import { getAllTags } from '../../../shared/apis/tagAPI';
import { getAllFields } from '../../../shared/apis/fieldAPI';
import { getPhoto } from '../../../shared/apis/photoAPI';

import GlobalContext from "../../../shared/contexts/GlobalContext";
import { FormattedMessage } from "react-intl";

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

function Items() {
  let navigate = useNavigate();
  const { collection } = useContext(GlobalContext);
  const { adminUserId } = useContext(GlobalContext);
  const { currentItem, setCurrentItem } = useContext(GlobalContext);
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
    let response = await getAllItems(collection.id);
    setItems(response);
  }

  const getCollectionPhoto = async () => {
    const photo = await getPhoto(collection.photo);
    setImgUrl(photo.url);
  }

  const editItem = (event, id) => {
    event.stopPropagation();
    setCurrentItem(id);
    navigate(routes.CREATEITEM)
  }

  const deleteItem = async (event, id) => {
    event.stopPropagation();
    const itemData = await removeItem(id);
    getAllCollectionItems();
  }

  const toNewItem = () => {
    setCurrentItem('');
    navigate(routes.CREATEITEM)
  }

  const openItem = async (item) => {
    setItemOptionFields(await getAllFields(item.id));
    setItemTags(await getAllTags(item.id));
    setItem(item.row)
    setOpen(true);
  }

  const columns = [
    { field: 'item_id', headerName: 'id' },
    { field: 'name' },
    {
      field: "updateOrDelete",
      headerName: "",
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      align: 'right',
      flex: 1,
      renderCell: (params) => (
        <ButtonGroup size="small" ButtonGroup variant="outlined" aria-label="outlined button group" >
          <Button
            onClick={(event) => { editItem(event, params.id) }}
            id={styles.tableButton}
          ><FormattedMessage id="app.collectionpage.button.edit"/></Button>
          <Button
            onClick={(event) => { deleteItem(event, params.id) }}
            id={styles.tableButton}
          ><FormattedMessage id="app.collectionpage.button.delete"/></Button>
        </ButtonGroup >
      )
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Grid className={styles.items} container justifyContent="center" direction="column" alignItems="center">
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
          <FormattedMessage id="app.collectionpage.add"/>
          </Button>
        </Box>
        <Box className={styles.table}>
          <DataGrid
            onRowClick={openItem}
            rows={items}
            columns={columns}
            disableColumnSelector
          />
        </Box>
      </Grid>
    </ThemeProvider>
  )
}

export default Items;