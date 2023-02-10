import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Grid from "@mui/material/Grid";
import GlobalContext from "./shared/contexts/GlobalContext";
import { IntlProvider } from "react-intl";
import AppRoutes from "./common/routes/AppRoutes";
import Navbar from "./common/navbar/Navbar";
import ruMessages from "./shared/localizations/ru.json";
import enMessages from "./shared/localizations/en.json";
import esMessages from "./shared/localizations/es.json";
import plMessages from "./shared/localizations/pl.json";
import localStorageKeys from "./shared/constants/localStorageKeys";
import locales from "./shared/constants/locales";

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
  [locales.ES]: esMessages,
  [locales.PL]: plMessages,
};

function App() {
  const [client, setClient] = useState({
    name: '',
    email: '',
    role: 'guest'
  });

  const [currentLocale, setCurrentLocale] = useState(
    localStorage.getItem(localStorageKeys.LOCALE) || locales.EN);

  const setLocale = (value) => {
    setCurrentLocale(value);
    localStorage.setItem(localStorageKeys.LOCALE, value);
  };

  return (
    <GlobalContext.Provider value={{
      client,
      setClient,
      currentLocale,
      setCurrentLocale: setLocale,
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
