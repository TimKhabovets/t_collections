import React, { useContext, useState } from 'react';
import { Box, Grid, Toolbar, Typography, InputBase, Button, AppBar } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router";
import routes from '../../shared/constants/routes';
import GlobalContext from "../../shared/contexts/GlobalContext";
import { FormattedMessage } from "react-intl";
import { logOut } from '../../shared/apis/userAPI';
import Sidebar from '../sidebar/Sidebar';
import styles from './style.module.scss';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  Hits,
  SearchBox,
} from 'react-instantsearch-hooks-web';
import { getAllTags, getTwentyTags } from '../../shared/apis/tagAPI';
import { getAllFields } from '../../shared/apis/fieldAPI';
import Item from '../../app/user/item/Item';
import { GetTranslateText } from '../../shared/functions/IntlHelpers';

const theme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      dark: '#212121',
    }
  }
});

export default function Navbar() {
  let navigate = useNavigate();
  const {adminUserId, setAdminUserId} = useContext(GlobalContext);
  const { client } = useContext(GlobalContext);
  const { isLoading } = useContext(GlobalContext);
  const [item, setItem] = useState({});
  const [openItem, setOpenItem] = useState(false);
  const [itemOptionFields, setItemOptionFields] = useState([]);
  const [itemTags, setItemTags] = useState([]);
  const clientAlgolia = algoliasearch('Y1KE1G5UA1', '8e314f921daaa5b1f404015350369c44');
  const searchClient = {
    ...clientAlgolia,
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: '',
          })),
        });
      }
      return clientAlgolia.search(requests);
    },
  };
  const index = clientAlgolia.initIndex('t-collection');

  const logIn = () => {
    navigate(routes.LOGIN)
  }
  const signUp = () => {
    navigate(routes.SIGNUP)
  }
  const toHome = () => {
    navigate(routes.HOME)
  }
  const toUserPage = () => {
    setAdminUserId('');
    navigate(routes.USERPAGE)
  }

  const logout = async () => {
    const response = await logOut();
    if (response) {
      navigate(routes.HOME);
      client.name = '';
      client.email = '';
      client.role = 'guest';
      client.id = '';
    }
  }

  const toOpenItem = async (item) => {
    const itemSearch = {
      ...item,
      id: item.objectID
    }
    setItemOptionFields(await getAllFields(itemSearch.id));
    setItemTags(await getAllTags(itemSearch.id));
    setItem(itemSearch);
    setOpenItem(true);
  }

  const Hit = ( {hit}) => {
    return (
      <article onClick={() => toOpenItem(hit)}>
        <h1>{hit.name}</h1>
        <p>{hit.topic}</p>
        <hr/>
      </article>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }} width="100%">
      <Item
        open={openItem}
        setOpen={setOpenItem}
        item={item}
        optionFields={itemOptionFields}
        tags={itemTags}
      />
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar >
            <Sidebar />
            <Box
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Typography
                onClick={toHome}
                variant="h6"
                className={styles.title}
              >t_collection</Typography>
            </Box>
            {isLoading ? (
              <Typography variant="h6" mx={1}>
                loading...
              </Typography>
            ) : (client.role === 'guest' ? (
              <Grid sx={{ display: { xs: 'none', sm: 'flex' }, direction: "row" }}>
                <Box >
                  <Button onClick={logIn} color="inherit"><FormattedMessage id="app.navbar.login"/></Button>
                </Box>
                <Box mx={1} >
                  <Button onClick={signUp} color="inherit" variant="contained" >
                    <Box sx={{ color: 'text.dark' }}><FormattedMessage id="app.navbar.signup"/></Box>
                  </Button>
                </Box>
              </Grid>
            ) : (
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Box>
                  <Button onClick={logout} color="inherit" variant="contained" >
                    <Box sx={{ color: 'text.dark' }}><FormattedMessage id="app.navbar.logout"/></Box>
                  </Button>
                </Box>
                <Box
                  mx={2}
                  onClick={toUserPage}
                  sx={{ cursor: "pointer", display: 'flex' }}>
                  <AccountBoxIcon className={styles.accountIcon} />
                  <Typography variant="h6" mx={1}>
                    {client.name}
                  </Typography>
                </Box>
              </Box>
            ))}
            <InstantSearch
              searchClient={searchClient}
              indexName="t-collection"
            >
              <SearchBox 
                placeholder={GetTranslateText("app.navbar.search")}
              />
              <Hits className={styles.hits} hitComponent={Hit} />
            </InstantSearch>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}