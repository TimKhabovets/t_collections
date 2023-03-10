import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Grid from "@mui/material/Grid";
import GlobalContext from "./shared/contexts/GlobalContext";
import { IntlProvider } from "react-intl";
import AppRoutes from "./common/routes/AppRoutes";
import Navbar from "./common/navbar/Navbar";
import ruMessages from "./shared/localizations/ru.json";
import enMessages from "./shared/localizations/en.json";
import localStorageKeys from "./shared/constants/localStorageKeys";
import locales from "./shared/constants/locales";
import { checkAuth } from "./shared/apis/userAPI";
import {useEffectOnce} from './shared/functions/useEffectOnce'

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
};

function App() {
  useEffectOnce(() => {
    if (localStorage.getItem('token')) {
      checkAuthAndSave();
    }
  }, true);

  const [client, setClient] = useState({
    role: 'guest'
  });
  const [ currentCollection, setCurrentCollection ] = useState('');
  const [ currentItem, setCurrentItem ] = useState('');
  const [ collection, setCollection] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [adminUserId, setAdminUserId] = useState('');
  const [currentLocale, setCurrentLocale] = useState(
    localStorage.getItem(localStorageKeys.LOCALE) || locales.EN);
    const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme') || 'dark');

  const setLocale = (value) => {
    setCurrentLocale(value);
    localStorage.setItem(localStorageKeys.LOCALE, value);
  };

  const checkAuthAndSave = async () => {
    setIsLoading(true);
    try {
      const response = await checkAuth();
      client.name = response.data.user.name;
      client.email = response.data.user.email;
      client.role = response.data.user.role;
      client.id = response.data.user.id;
    }
    catch (err) {
      console.log(err);
    } 
    finally {
      setIsLoading(false);
    }
  }

  return (
    <GlobalContext.Provider value={{
      currentItem,
      setCurrentItem,
      collection,
      setCollection,
      currentCollection,
      setCurrentCollection,
      adminUserId,
      setAdminUserId,
      isLoading,
      client,
      currentLocale,
      setCurrentLocale: setLocale,
      isDarkTheme,
      setIsDarkTheme
    }}>
      <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
        <BrowserRouter>
          <Grid container direction="column">
            <Navbar />
            <AppRoutes />
          </Grid>
        </BrowserRouter>
      </IntlProvider>
    </GlobalContext.Provider>
  );
}

export default App;
