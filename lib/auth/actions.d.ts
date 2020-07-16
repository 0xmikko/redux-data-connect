import { ThunkAction } from "redux-thunk";
import { RSAAAction } from "redux-api-middleware";
import { AuthActions, TokenPayload } from "./index";
import { DataConnectRootStateI } from "..";
export declare const createLoginAction: (endpoint: string) => (email: string, password: string) => ThunkAction<void, DataConnectRootStateI, unknown, AuthActions>;
export declare const createOAuthCodeAction: (endpoint: string) => (provider: string, code: string) => ThunkAction<void, DataConnectRootStateI, unknown, AuthActions>;
export declare const refreshAccessToken: (endpoint: string, token: string) => RSAAAction<any, TokenPayload, void>;
export declare const logout: () => ThunkAction<void, DataConnectRootStateI, unknown, AuthActions>;
export declare const createGetTokenAtStartupAction: (endpoint: string) => () => ThunkAction<void, DataConnectRootStateI, unknown, AuthActions>;
