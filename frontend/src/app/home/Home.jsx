import React, { useState } from 'react';
import { useEffectOnce } from '../../shared/functions/useEffectOnce';
import { getFourItems, getTagItems, getAllItems } from '../../shared/apis/itemAPI';
import { getAllTags, getTwentyTags } from '../../shared/apis/tagAPI';
import { getAllFields } from '../../shared/apis/fieldAPI';
import { getFourCollections } from '../../shared/apis/collectionAPI';
import { getPhoto } from '../../shared/apis/photoAPI';
import styles from './style.module.scss';
import Item from '../user/item/Item';
import parse from 'html-react-parser';
import { FormattedMessage } from "react-intl";

import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';

function Home() {
  const [items, setItems] = useState([]);
  const [openItem, setOpenItem] = useState(false);
  const [itemOptionFields, setItemOptionFields] = useState([]);
  const [itemTags, setItemTags] = useState([]);
  const [item, setItem] = useState({});
  const [collections, setCollections] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagItems, setTagItems] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);

  useEffectOnce(() => {
    getItems();
    getCollections();
    getTags();
  }, true);

  const getItems = async () => {
    const items = await getFourItems();
    setItems(items || []);
  }

  const getCollections = async () => {
    const collections = await getFourCollections();
    for (let collection of collections) {
      await getCollectionPhoto(collection.photo);
    };
    setCollections(collections || []);
  }

  const getTags = async () => {
    const tagsData = await getTwentyTags();
    setTags(tagsData || []);
  }

  const getCollectionPhoto = async (id) => {
    const photo = await getPhoto(id);
    setImgUrl(oldArray => [...oldArray, photo]);
  }

  const toOpenItem = async (item) => {
    setItemOptionFields(await getAllFields(item.id));
    setItemTags(await getAllTags(item.id));
    setItem(item);
    setOpenItem(true);
  }

  const getItemsByTag = async (tag) => {
    const items = await getTagItems(tag);
    setTagItems(items);
    setOpenSearch(true);
  }

  const getCollectionItems = async (id) => {
    const items = await getAllItems(id);
    setTagItems(items);
    setOpenSearch(true);
  }

  const clear = () => {
    setTagItems([]);
    setOpenSearch(false);
  }

  return (
    <Grid className={styles.home} width="100%" container justifyContent="center">
      <Item
        open={openItem}
        setOpen={setOpenItem}
        item={item}
        optionFields={itemOptionFields}
        tags={itemTags}
      />
      <Box className={styles.searchItems}>
        {openSearch ? (
          <Box my={1} sx={{cursor: 'pointer'}} onClick={() => clear()}>
            clear...
          </Box>) : (null)}
        {
          tagItems.map(item => (
            <article onClick={() => { toOpenItem(item) }}>
              <h1>{item.name}</h1>
              <hr />
            </article>
          ))
        }
      </Box>
      <Box ml={4} mt={5}>
        <Typography ><FormattedMessage id="app.home-page.items.header" /></Typography>
      </Box>
      <Grid py={5} container justifyContent="space-evenly" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          items.map((item) => {
            return (
              <Grid item xs={3} justifyContent="center" key={item.id}>
                <Card className={styles.card} onClick={() => { toOpenItem(item) }}>
                  <CardHeader
                    avatar={
                      <Avatar id={styles.avatar} aria-label="recipe">
                        o
                      </Avatar>
                    }
                    title={item.name}
                  />
                  <CardContent id={styles.content}>
                    <Typography >id: {item.item_id}</Typography>
                    {
                      item.optionFields.map(field => {
                        return (
                          <Typography >{field.name}: {parse(field.value)}</Typography>
                        )
                      })
                    }
                  </CardContent>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>
      <Grid className={styles.background} container justifyContent="center">
        <Box ml={4} mt={5}>
          <Typography ><FormattedMessage id="app.home-page.collections.header" /></Typography>
        </Box>
        <Grid py={5} container justifyContent="space-evenly" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            collections.map((collection, index) => {
              return (
                <Grid item xs={3} justifyContent="center" key={collection.id}>
                  <Card className={styles.collectionCard} onClick={() => {getCollectionItems(collection.id) }}>
                    <CardHeader
                      avatar={
                        <Avatar id={styles.avatar} aria-label="recipe">
                          o
                        </Avatar>
                      }
                      title={collection.name}
                      subheader={collection.topic}
                    />
                    {collection.photo ? (
                      <CardMedia
                        component="img"
                        height="190"
                        image={imgUrl[index].url}
                        alt="Photo"
                      />
                    ) : (
                      <Skeleton variant="rectangular" height={190} />
                    )}
                    <CardContent id={styles.content}>
                      <Typography variant="comment">{parse(collection.comment)}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
      <Grid my={5} maxWidth="100%" container justifyContent="center">
        <ul className={styles.cloud} role="navigation" aria-label="Webdev word cloud">
          {
            tags.map(tag => {
              return (
                <li onClick={() => { getItemsByTag(tag.name) }}><div className={styles.tag} data-weight={(Math.floor(Math.random() * 8) + 1)}>{tag.name}</div></li>
              )
            })
          }
        </ul>
      </Grid>
    </Grid>
  )
}

export default Home;