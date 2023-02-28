import React, { useContext } from 'react';
import { Box, Grid, Toolbar, Typography, InputBase, Button, AppBar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router";
import routes from '../../shared/constants/routes';
import GlobalContext from "../../shared/contexts/GlobalContext";
import { logOut } from '../../shared/apis/userAPI';
import Sidebar from '../sidebar/Sidebar';
import styles from './style.module.scss';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  Hits,
  SearchBox,
} from 'react-instantsearch-hooks-web';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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
  const { client } = useContext(GlobalContext);
  const { isLoading } = useContext(GlobalContext);
  const clientAlgolia = algoliasearch('Y1KE1G5UA1', '8e314f921daaa5b1f404015350369c44');
  const index = clientAlgolia.initIndex('t-collection')

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

  // function Hit(props) {
  //   return (
  //     <div>
  //       <img src={props.hit.image} align="left" alt={props.hit.name} />
  //       <div className="hit-name">
  //         <Highlight attribute="name" hit={props.hit} />
  //       </div>
  //       <div className="hit-description">
  //         <Highlight attribute="description" hit={props.hit} />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
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
                  <Button onClick={logIn} color="inherit">Login</Button>
                </Box>
                <Box mx={1} >
                  <Button onClick={signUp} color="inherit" variant="contained" >
                    <Box sx={{ color: 'text.dark' }}>Signup</Box>
                  </Button>
                </Box>
              </Grid>
            ) : (
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Box>
                  <Button onClick={logout} color="inherit" variant="contained" >
                    <Box sx={{ color: 'text.dark' }}>Logout</Box>
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
            <Search>
              <InstantSearch
                searchClient={clientAlgolia}
                indexName="t-collection"
              >
                <SearchBox />
              </InstantSearch>
            </Search>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}