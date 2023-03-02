import { createContext } from "react";
import locales from "../constants/locales";

const GlobalContext = createContext({
    client: {
        id: '',
        name: '',
        email: '',
        role: '',
    },
    collection: {},
    currentCollection: '',
    currentItem: '',
    currentLocale: locales.EN,
    isLoading: Boolean,
    adminUserId: '',
});

export default GlobalContext;