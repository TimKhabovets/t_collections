import React, { useContext, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { IsUser } from '../../shared/functions/checks/UserCheck';
import { IsAdmin } from '../../shared/functions/checks/AdminCheck';
import GlobalContext from "../../shared/contexts/GlobalContext";

const theme = createTheme({
  typography: {
    link: {
      fontSize: 20,
      color: 'white',
    },
  },
});


export default function TemporaryDrawer() {
  const [burger, setBurger] = useState(false);
  const { client } = useContext(GlobalContext);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setBurger(open);
  };

  const list = () => (
    <ThemeProvider theme={theme}>
      <Box
        width="250px"
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {IsUser(client.role) ? (
            <Box mx={3} my={2} sx={{ cursor: 'pointer'}}>
              <Link to={routes.USERPAGE}>
                <Typography variant='link'>
                  My Collections
                </Typography>
                <hr className='hrColor'/>
              </Link>
            </Box>
          ) : (<></>)
          }
          {(client.role === 'guest') ? (
            <Box mx={3} my={2} sx={{ cursor: 'pointer'}}>
              <Link to={routes.LOGIN}>
                <Typography variant='link'>
                  Log In
                </Typography>
              </Link>
              <hr/>
            </Box>
          ) : (<></>)
          }
          {(client.role === 'guest') ? (
            <Box mx={3} my={2} sx={{ cursor: 'pointer'}}>
              <Link to={routes.SIGNUP}>
                <Typography variant='link'>
                  Sing Up
                </Typography>
              </Link>
              <hr/>
            </Box>
          ) : (<></>)
          }

        </List>
      </Box>
    </ThemeProvider>
  );

  return (
    <div>
      <React.Fragment>
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
        </Drawer>
      </React.Fragment>
    </div>
  );
}