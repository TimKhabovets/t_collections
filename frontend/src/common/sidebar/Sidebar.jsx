import React, { useContext, useState } from 'react';
import LocalePicker from "./LocalePicker";
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { IsUser } from '../../shared/functions/checks/UserCheck';
import { IsAdmin } from '../../shared/functions/checks/AdminCheck';
import GlobalContext from "../../shared/contexts/GlobalContext";
import { useNavigate } from "react-router";
import styles from './styles.module.scss';

import { Box, IconButton, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';

import { logOut } from '../../shared/apis/userAPI';

const light = {
  typography: {
    link: {
      fontSize: 20,
      color: 'black',
    },
  },
};

const dark = {
  typography: {
    link: {
      fontSize: 20,
      color: 'white',
    },
  },
};

export default function TemporaryDrawer({theme, setTheme}) {
  let navigate = useNavigate();
  const { adminUserId, setAdminUserId } = useContext(GlobalContext);
  const [burger, setBurger] = useState(false);
  const { client } = useContext(GlobalContext);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setBurger(open);
  };

  const toUserPage = () => {
    setAdminUserId('');
    navigate(routes.USERPAGE);
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

  const changeTheme = () => {
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const list = () => (
    <ThemeProvider theme={theme === 'dark' ? createTheme(dark) : createTheme(light)}>
      <Box
  
        width="250px"
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <Box mx={3} my={2} className={styles.link}>
            <Link to={routes.HOME}>
              <Typography variant='link'>
              <FormattedMessage id="app.sidebar.home"/>
              </Typography>
            </Link>
            <hr />
          </Box>
          {IsUser(client.role) ? (
            <Box mx={3} my={2} className={styles.link}>
              <Box onClick={toUserPage}>
                <Typography variant='link'>
                <FormattedMessage id="app.sidebar.userpage"/>
                </Typography>
                <hr className='hrColor' />
              </Box>
            </Box>
          ) : (null)
          }
          {
            IsAdmin(client.role) ? (
              <Box mx={3} my={2} className={styles.link}>
                <Link to={routes.ADMIN}>
                  <Typography variant='link'>
                  <FormattedMessage id="app.sidebar.admin"/>
                  </Typography>
                  <hr className='hrColor' />
                </Link>
              </Box>
            ) : (null)
          }
          {(client.role === 'guest') ? (
            <Box mx={3} my={2} className={styles.link}>
              <Link to={routes.LOGIN}>
                <Typography variant='link'>
                <FormattedMessage id="app.sidebar.login"/>
                </Typography>
              </Link>
              <hr />
            </Box>
          ) : (null)
          }
          {(client.role === 'guest') ? (
            <Box mx={3} my={2} className={styles.link}>
              <Link to={routes.SIGNUP}>
                <Typography variant='link'>
                  <FormattedMessage id="app.sidebar.signup"/>
                </Typography>
              </Link>
              <hr />
            </Box>
          ) : (null)
          }
          {IsUser(client.role) ? (
            <Box mx={3} my={2} className={styles.link}>
              <Box onClick={logout}>
                <Typography variant='link'>
                <FormattedMessage id="app.sidebar.logout"/>
                </Typography>
                <hr className='hrColor' />
              </Box>
            </Box>
          ) : (null)
          }
          
        </List>
      </Box>
    </ThemeProvider>
  );

  return (
    <Box >
      <React.Fragment >
        <IconButton
          onClick={toggleDrawer(true)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={burger}
          onClose={toggleDrawer(false)}
        >
          {list()}
          <LocalePicker />
          <Box className={styles.theme}>
            Change theme: 
            <input type="checkbox" checked={theme} onChange={changeTheme} />
          </Box>
        </Drawer>
      </React.Fragment>
    </Box>
  );
}