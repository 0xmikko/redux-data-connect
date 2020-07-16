import { DataConnectRootStateI } from "..";
export interface TokenDTO {
    token: string;
    user_id: string;
    exp: number;
}
export declare type AuthActions = {
    type: "AUTH_LOGIN_REQUEST" | "AUTH_REFRESH_REQUEST" | "AUTH_SIGNUP_REQUEST";
} | {
    type: "AUTH_LOGIN_SUCCESS" | "AUTH_REFRESH_SUCCESS" | "AUTH_SIGNUP_SUCCESS";
    payload: {
        access: string;
        refresh?: string;
    };
} | {
    type: "AUTH_LOGIN_FAILURE" | "AUTH_REFRESH_FAILURE" | "AUTH_SIGNUP_FAILURE";
} | {
    type: "AUTH_STARTUP_TOKEN_FAILURE";
} | {
    type: "AUTH_LOGOUT";
};
export interface TokenPayload {
    access: string;
    refresh: string;
    error?: boolean;
}
export declare type AuthStatus = "AUTH_STARTUP" | "AUTH_REQUIRED" | "AUTH_SUCCESS";
export interface AuthStateType {
    access?: TokenDTO;
    refresh?: TokenDTO;
    status: AuthStatus;
}
export declare function accessToken(state: DataConnectRootStateI): string | undefined;
export declare function isAccessTokenExpired(state: DataConnectRootStateI): boolean;
export declare function refreshToken(state: DataConnectRootStateI): string | undefined;
export declare function isRefreshTokenExpired(state: DataConnectRootStateI): boolean;
export declare function isAuthenticated(state: DataConnectRootStateI): boolean;
export declare function withAuth(headers?: {}): (state: DataConnectRootStateI) => {
    Authorization: string;
};
