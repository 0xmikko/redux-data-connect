/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { DataConnectRootStateI } from '..';


export interface TokenDTO {
  token: string;
  user_id: string;
  exp: number;
}

// AUTH handlers
export type AuthActions =
  | {
      type:
        | "AUTH_LOGIN_REQUEST"
        | "AUTH_REFRESH_REQUEST"
        | "AUTH_SIGNUP_REQUEST";
    }
  | {
      type:
        | "AUTH_LOGIN_SUCCESS"
        | "AUTH_REFRESH_SUCCESS"
        | "AUTH_SIGNUP_SUCCESS";
      payload: { access: string; refresh?: string };
    }
  | {
      type:
        | "AUTH_LOGIN_FAILURE"
        | "AUTH_REFRESH_FAILURE"
        | "AUTH_SIGNUP_FAILURE";
    }
  | {
      type: "AUTH_STARTUP_TOKEN_FAILURE";
    }
  | {
      type: "AUTH_LOGOUT";
    };

export interface TokenPayload {
  access: string;
  refresh: string;
  error?: boolean;
}

export type AuthStatus = "AUTH_STARTUP" | "AUTH_REQUIRED" | "AUTH_SUCCESS";

export interface AuthStateType {
  access?: TokenDTO;
  refresh?: TokenDTO;
  status: AuthStatus;
}

export function accessToken(state: DataConnectRootStateI) : string | undefined {
    return state.auth?.access?.token;
}

export function isAccessTokenExpired(state: DataConnectRootStateI) {
  if (state.auth.access && state.auth.access.exp) {
    return 1000 * state.auth.access.exp - new Date().getTime() < 5000;
  }
  return true;
}

export function refreshToken(state: DataConnectRootStateI) : string | undefined {
    return state.auth?.refresh?.token;
}

export function isRefreshTokenExpired(state: DataConnectRootStateI): boolean {
  if (state.auth.refresh && state.auth.refresh.exp) {
    return 1000 * state.auth.refresh.exp - new Date().getTime() < 5000;
  }
  return true;
}

export function isAuthenticated(state: DataConnectRootStateI): boolean {
  return !isRefreshTokenExpired(state);
}

export function withAuth(headers = {}) {
  return (state: DataConnectRootStateI) => ({
    ...headers,
    Authorization: `Bearer ${accessToken(state)}`,
  });
}
