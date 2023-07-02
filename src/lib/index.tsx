import NextAuthProvider from "./providers/Auth.Providers";
import ReduxStoreProvider from "./providers/Redux.Providers";
import ThemeProvider from "./providers/Theme.Providers";
import SocketProvider, { SocketContext } from "./providers/Socket.Provider";
import DomainProvider from "./providers/Domain.Provider";
import { changeTheme } from "./utils/common";
import { serverInstance } from "./utils/axios";
import { CustomError } from "./utils/error";

export {
    NextAuthProvider,
    ReduxStoreProvider,
    ThemeProvider,
    DomainProvider,
    changeTheme,
    serverInstance,
    CustomError,
    SocketProvider,
    SocketContext,
}