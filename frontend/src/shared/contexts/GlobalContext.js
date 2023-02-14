import { createContext } from "react";
import locales from "../constants/locales";

const GlobalContext = createContext({
    client: {
        id: '',
        name: '',
        email: '',
        role: '',
    },
    currentLocale: locales.EN,
    isLoading: Boolean,
});

export default GlobalContext;