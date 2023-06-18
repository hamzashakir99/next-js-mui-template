import NextAuthProvider from "./providers/Auth.Providers";
import ReduxStoreProvider from "./providers/Redux.Providers";
import ThemeProvider from "./providers/Theme.Providers";
import ReactQueryProvider from "./providers/React.Query.Providers";
import { changeTheme } from "./utils/common";
import { serverInstance } from "./utils/axios";
import { CustomError } from "./utils/error";
import Hydrate from "./utils/hydrate.client";
import getQueryClient from "./utils/get.query.client";

export {
    NextAuthProvider,
    ReduxStoreProvider,
    ThemeProvider,
    ReactQueryProvider,
    changeTheme,
    serverInstance,
    CustomError,
    Hydrate,
    getQueryClient
}