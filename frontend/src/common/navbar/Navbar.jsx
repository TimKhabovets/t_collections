import React, { useContext } from 'react';
import { Box, Grid, Toolbar, IconButton, Typography, InputBase, Button, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router";
import routes from '../../shared/constants/routes'
import GlobalContext from "../../shared/contexts/GlobalContext"
import { width } from '@mui/system';

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

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Typography
                onClick={toHome}
                variant="h6"
                sx={{ width: "101px", cursor: 'pointer' }}
              >t_collection</Typography>
            </Box>
            {client.role === 'guest' ? (
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
              <Box
                mx={2}
                onClick={toUserPage}
                sx={{ cursor: "pointer", display: 'flex' }}>
                  <AccountBoxIcon sx={{ top: '2px', position: 'relative'}} />
                <Typography variant="h6" mx={1}>
                  {client.name}
                </Typography>
              </Box>
            )}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}