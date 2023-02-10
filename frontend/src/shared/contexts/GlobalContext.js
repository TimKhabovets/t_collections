import { createContext } from "react";
import locales from "../constants/locales";

const GlobalContext = createContext({
    client: {
        name: '',
        email: '',
        role: '',
    },
    currentLocale: locales.EN,
});

export default GlobalContext;